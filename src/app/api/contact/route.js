import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, budget, project, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const recipientEmail = "sameer.freelance01@gmail.com";

    // 1. Check if Web3Forms Key is configured in environment
    const web3formsKey = process.env.WEB3FORMS_KEY;
    if (web3formsKey) {
      const web3res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name,
          email,
          budget: budget || "Not specified",
          project: project || "General Inquiry",
          message,
          subject: `⚡ Portfolio Signal: ${name} [${budget || "Budget Unspecified"}]`,
        }),
      });

      const data = await web3res.json();
      if (data.success) {
        return NextResponse.json({ success: true, provider: "web3forms" });
      }
    }

    // 2. Check if Gmail / SMTP credentials are configured in .env.local
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (emailUser && emailPass) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const mailOptions = {
        from: `"${name}" <${emailUser}>`,
        replyTo: email,
        to: recipientEmail,
        subject: `⚡ Portfolio Signal: ${name} [${budget || "Budget Unspecified"}]`,
        text: `New project inquiry received from ${name} (${email}):\n\nExpected Budget: ${budget || "Not specified"}\nProject Scope: ${project || "Not specified"}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: 'Segoe UI', Roboto, sans-serif; background-color: #030014; color: #ffffff; padding: 40px; border-radius: 14px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(0, 240, 255, 0.25);">
            <div style="border-bottom: 1px solid rgba(0, 240, 255, 0.2); padding-bottom: 20px; margin-bottom: 25px;">
              <h2 style="color: #00F0FF; margin: 0 0 8px 0; font-size: 22px; letter-spacing: 1px;">⚡ NEW TRANSMISSION RECEIVED</h2>
              <p style="color: #8888aa; margin: 0; font-size: 12px; font-family: monospace;">PORTFOLIO CONTACT FORM // SYS.AURA</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #00F0FF; font-family: monospace; font-size: 12px; width: 140px;">SENDER:</td>
                  <td style="padding: 10px 0; color: #ffffff; font-weight: 600; font-size: 15px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #00F0FF; font-family: monospace; font-size: 12px;">EMAIL:</td>
                  <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #00F0FF; text-decoration: none; font-size: 15px;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #00F0FF; font-family: monospace; font-size: 12px;">BUDGET:</td>
                  <td style="padding: 10px 0; color: #ffffff; font-size: 15px;">${budget || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #00F0FF; font-family: monospace; font-size: 12px;">PROJECT SCOPE:</td>
                  <td style="padding: 10px 0; color: #ffffff; font-size: 15px;">${project || "General Inquiry"}</td>
                </tr>
              </table>
            </div>

            <div style="background: rgba(10, 10, 26, 0.7); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 8px; padding: 22px; margin-top: 25px;">
              <div style="color: #00F0FF; font-family: monospace; font-size: 11px; margin-bottom: 10px; letter-spacing: 1px;">MESSAGE CONTENT:</div>
              <div style="color: #ffffff; line-height: 1.7; font-size: 14.5px; white-space: pre-wrap;">${message}</div>
            </div>

            <div style="margin-top: 30px; text-align: center;">
              <a href="mailto:${email}?subject=Re:%20Your%20Project%20Inquiry%20via%20Portfolio" style="display: inline-block; padding: 14px 32px; background: #00F0FF; color: #030014; font-weight: 700; text-decoration: none; border-radius: 6px; font-family: monospace; font-size: 13px; letter-spacing: 1.5px;">REPLY TO SENDER</a>
            </div>
          </div>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true, provider: "nodemailer" });
      } catch (smtpErr) {
        console.error("Nodemailer SMTP delivery error:", smtpErr);
        console.log(`[Backup Log] From: ${name} (${email}) - Message: ${message}`);
        return NextResponse.json({
          success: true,
          warning: "SMTP delivery encountered an issue; inquiry safely logged on server.",
        });
      }
    }

    // 3. Fallback: log to server console and inform client
    console.log("=== INCOMING PORTFOLIO CONTACT TRANSMISSION ===");
    console.log(`From: ${name} <${email}>`);
    console.log(`Budget: ${budget || "Not specified"}`);
    console.log(`Scope: ${project || "Not specified"}`);
    console.log(`Message: ${message}`);
    console.log("Target Email: sameer.freelance01@gmail.com");
    console.log("================================================");

    return NextResponse.json({
      success: true,
      simulated: true,
      message: "Transmission received and logged. Add EMAIL_USER & EMAIL_PASS in .env.local for automatic SMTP forwarding.",
    });
  } catch (error) {
    console.error("Failed to forward contact signal:", error);
    return NextResponse.json(
      { error: "Transmission failed. Please email sameer.freelance01@gmail.com directly." },
      { status: 500 }
    );
  }
}
