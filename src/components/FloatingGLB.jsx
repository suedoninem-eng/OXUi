import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

const MASCOTE_PATH = '/conteudospaginaia/logoss2/mascote.glb';

function FloatingModel({ url }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  const [velocity] = useState(() => new THREE.Vector3(
    (Math.random() > 0.5 ? 1 : -1) * 0.02,
    (Math.random() > 0.5 ? 1 : -1) * 0.02,
    0
  ));

  const [rotSpeed] = useState(() => new THREE.Vector3(
    (Math.random() - 0.5) * 0.01,
    (Math.random() - 0.5) * 0.01,
    (Math.random() - 0.5) * 0.01
  ));

  const { viewport } = useThree();
  const margin = 2.0;
  const dragInfo = useRef({ isDragging: false, lastX: 0, lastY: 0, throwVel: { x: 0, y: 0 } });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => {
      if (dragInfo.current.isDragging) {
        dragInfo.current.isDragging = false;
        document.body.style.cursor = 'auto';
        velocity.x = dragInfo.current.throwVel.x || (Math.random() - 0.5) * 0.04;
        velocity.y = dragInfo.current.throwVel.y || (Math.random() - 0.5) * 0.04;
      }
    };
    const handleMouseMove = (e) => {
      if (dragInfo.current.isDragging && ref.current) {
        const deltaX = e.clientX - dragInfo.current.lastX;
        const deltaY = e.clientY - dragInfo.current.lastY;
        ref.current.position.x += deltaX * 0.015;
        ref.current.position.y -= deltaY * 0.015;
        ref.current.rotation.y += deltaX * 0.01;
        ref.current.rotation.x += deltaY * 0.01;
        dragInfo.current.throwVel = { x: deltaX * 0.002, y: -deltaY * 0.002 };
        dragInfo.current.lastX = e.clientX;
        dragInfo.current.lastY = e.clientY;
      }
    };
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [velocity]);

  useFrame(() => {
    if (!ref.current || dragInfo.current.isDragging) return;
    ref.current.position.x += velocity.x;
    ref.current.position.y += velocity.y;
    const halfW = viewport.width / 2 - margin;
    const halfH = viewport.height / 2 - margin;
    if (ref.current.position.x > halfW || ref.current.position.x < -halfW) velocity.x *= -1;
    if (ref.current.position.y > halfH || ref.current.position.y < -halfH) velocity.y *= -1;
    if (!isHovered) {
      ref.current.rotation.y += rotSpeed.y;
      ref.current.rotation.x += rotSpeed.x * 0.3;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <primitive
        object={scene}
        ref={ref}
        scale={1.5}
        onPointerOver={(e) => { e.stopPropagation(); setIsHovered(true); document.body.style.cursor = 'grab'; }}
        onPointerOut={(e) => { e.stopPropagation(); setIsHovered(false); document.body.style.cursor = 'auto'; }}
        onPointerDown={(e) => {
          e.stopPropagation();
          dragInfo.current.isDragging = true;
          dragInfo.current.lastX = e.clientX;
          dragInfo.current.lastY = e.clientY;
          document.body.style.cursor = 'grabbing';
        }}
      />
    </Float>
  );
}

/**
/**
 * FloatingGLB
 * - Renderizado via Portal direto no document.body (escapa do stacking context GSAP)
 * - Só aparece no desktop (≥ 1024px) via CSS
 * - Faz fade in/out baseado na prop `visible` (controlado pela seção Design-Driven)
 */
export default function FloatingGLB({ visible = true }) {
  const content = (
    <div
      className="via-glb-wrapper"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          // Zera o alpha do fundo WebGL — garante transparência real
          gl.setClearColor(0x000000, 0);
        }}
        eventSource={document.getElementById('root') ?? document.body}
        eventPrefix="client"
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} />
        <Environment preset="city" />
        <React.Suspense fallback={null}>
          <FloatingModel url={MASCOTE_PATH} />
        </React.Suspense>
      </Canvas>
    </div>
  );

  // Portal: renderiza diretamente no document.body,
  // fora de qualquer stacking context criado pelo GSAP ou CSS transforms
  return createPortal(content, document.body);
}



