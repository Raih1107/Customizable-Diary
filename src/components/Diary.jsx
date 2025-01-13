import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

const Diary = ({ color, rotation }) => {
  const containerRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Resize handler
  const resizeHandler = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    // Add resize event listener
    window.addEventListener('resize', resizeHandler);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  useEffect(() => {
    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      windowSize.width / windowSize.height,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(windowSize.width, windowSize.height);
    containerRef.current.appendChild(renderer.domElement);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.enableZoom = false; // Disable zooming with scroll

    // Diary Cover (BoxGeometry)
    const geometry = new THREE.BoxGeometry(1, 1.5, 0.1);
    const material = new THREE.MeshStandardMaterial({ color });
    const diary = new THREE.Mesh(geometry, material);
    scene.add(diary);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Camera Position
    camera.position.z = 3;

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Apply rotation from props
      diary.rotation.x = rotation.x;
      diary.rotation.y = rotation.y;

      controls.update(); // Update controls in the animation loop
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      containerRef.current.removeChild(renderer.domElement);
    };
  }, [color, rotation, windowSize]); // Re-run effect when windowSize or rotation changes

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default Diary;
