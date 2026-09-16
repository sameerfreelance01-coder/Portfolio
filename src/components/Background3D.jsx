"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene & Camera from Sample 2
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    // 2. High-performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // 3. Outer geometric wireframe shape from Sample 2
    const geometry = new THREE.IcosahedronGeometry(2.5, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    // 4. Inner glowing core from Sample 2
    const coreGeometry = new THREE.IcosahedronGeometry(1.5, 0);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x0055ff,
      transparent: true,
      opacity: 0.22,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // 5. Starfield particles from Sample 2 (800 count)
    const particleCount = 800;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 25;
    }
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.032,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 6. Smooth Mouse Parallax tracking from Sample 2
    let mouseX3D = 0;
    let mouseY3D = 0;
    const handleMouseMove = (e) => {
      mouseX3D = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY3D = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // 7. Pure 60fps Animation Loop from Sample 2 (NO scroll stuttering!)
    let animId;
    let camX = 0;
    let camY = 0;

    function animate3D() {
      animId = requestAnimationFrame(animate3D);

      // Continuous fluid rotation
      shape.rotation.x += 0.002;
      shape.rotation.y += 0.003;

      core.rotation.x -= 0.001;
      core.rotation.y -= 0.002;

      particles.rotation.y += 0.0005;

      // Silky mouse parallax lerp (Sample 2 formula: 0.05 factor)
      camX += (mouseX3D * 0.5 - camX) * 0.05;
      camY += (mouseY3D * 0.5 - camY) * 0.05;

      camera.position.x = camX;
      camera.position.y = camY;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate3D();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="bg-canvas" ref={canvasRef} />;
}
