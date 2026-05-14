import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GlobalBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    globeGroup.position.x = -2.5; // Shift globe significantly left
    scene.add(globeGroup);

    // 1. Denser Dot Matrix Globe
    const loader = new THREE.TextureLoader();
    loader.load('https://unpkg.com/three-globe/example/img/earth-topology.png', (texture) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const img = texture.image;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const positions = [];
      const density = 1.5; // Denser dots

      for (let i = 0; i < canvas.height; i += density) {
        for (let j = 0; j < canvas.width; j += density) {
          const index = (Math.floor(i) * canvas.width + Math.floor(j)) * 4;
          if (imageData[index] > 128) {
            const lat = (i / canvas.height) * -180 + 90;
            const lon = (j / canvas.width) * 360 - 180;
            
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lon + 180) * (Math.PI / 180);
            
            const x = -(5 * Math.sin(phi) * Math.cos(theta));
            const y = 5 * Math.cos(phi);
            const z = 5 * Math.sin(phi) * Math.sin(theta);
            
            positions.push(x, y, z);
          }
        }
      }

      const dotGeometry = new THREE.BufferGeometry();
      dotGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      const dotMaterial = new THREE.PointsMaterial({
        color: 0x10b981,
        size: 0.02,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6
      });
      const dots = new THREE.Points(dotGeometry, dotMaterial);
      globeGroup.add(dots);
    });

    // 2. Glowing Arcs (Logistics Routes)
    const arcCount = 20;
    const arcs: THREE.Line[] = [];

    function createArc() {
      const startLat = (Math.random() - 0.5) * 160;
      const startLon = (Math.random() - 0.5) * 360;
      const endLat = (Math.random() - 0.5) * 160;
      const endLon = (Math.random() - 0.5) * 360;

      const start = polarToCartesian(startLat, startLon, 5);
      const end = polarToCartesian(endLat, endLon, 5);
      
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const distance = start.distanceTo(end);
      mid.normalize().multiplyScalar(5 + distance * 0.3);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      
      // Use multiple lines for glow effect
      const material = new THREE.LineBasicMaterial({ 
        color: 0x10b981, 
        transparent: true, 
        opacity: 0.3 
      });
      const line = new THREE.Line(geometry, material);
      
      globeGroup.add(line);
      return line;
    }

    for (let i = 0; i < arcCount; i++) {
      arcs.push(createArc());
    }

    function polarToCartesian(lat: number, lon: number, radius: number) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    }

    // 3. Ambient Wireframe
    const wireframe = new THREE.Mesh(
      new THREE.SphereGeometry(4.98, 40, 40),
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.03 })
    );
    globeGroup.add(wireframe);

    camera.position.z = 12;
    camera.position.x = 2; // Move camera right to push globe visual to the left


    const animate = () => {
      requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.0006;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-transparent">
      {/* Subtle background glow behind the globe */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
