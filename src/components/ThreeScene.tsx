
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Text } from '@react-three/drei';
import { usePresentationContext } from '../contexts/PresentationContext';
import * as THREE from 'three';

const AnimatedSphere = ({ position, color, section }: { position: [number, number, number], color: string, section: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { state } = usePresentationContext();
  
  useFrame((frameState, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
      
      // Scale based on current section
      const targetScale = state.currentSection === section ? 1.5 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Glow effect when active - properly cast material
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      if (state.currentSection === section) {
        material.emissive.setHex(0x444444);
      } else {
        material.emissive.setHex(0x000000);
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>
    </Float>
  );
};

const AnimatedText = ({ text, position, section }: { text: string, position: [number, number, number], section: number }) => {
  const textRef = useRef<THREE.Mesh>(null);
  const { state } = usePresentationContext();
  
  useFrame(() => {
    if (textRef.current) {
      const isActive = state.currentSection === section;
      const targetOpacity = isActive ? 1 : 0.3;
      // Properly cast material for opacity access
      const material = textRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.1);
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.5}
      color="#fbbf24"
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
};

const CameraController = () => {
  const { camera } = useThree();
  const { state } = usePresentationContext();
  
  useFrame(() => {
    if (state.isAutoScrolling) {
      const targetY = -state.currentSection * 8;
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    }
  });

  return null;
};

const FloatingParticle = ({ position }: { position: [number, number, number] }) => {
  return (
    <Float speed={Math.random() * 2 + 1} rotationIntensity={Math.random()}>
      <mesh position={position}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#fbbf24" opacity={0.3} transparent />
      </mesh>
    </Float>
  );
};

const Scene = () => {
  const sections = [
    { title: "Welcome", color: "#fbbf24", position: [0, 0, 0] },
    { title: "About Me", color: "#f97316", position: [-3, -8, 0] },
    { title: "Portfolio", color: "#ef4444", position: [3, -16, 0] },
    { title: "Skills", color: "#8b5cf6", position: [-2, -24, 0] },
    { title: "Experience", color: "#06b6d4", position: [2, -32, 0] },
    { title: "Testimonials", color: "#10b981", position: [0, -40, 0] },
    { title: "Contact", color: "#f59e0b", position: [0, -48, 0] }
  ];

  return (
    <>
      <CameraController />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#fbbf24" />
      
      {sections.map((section, index) => (
        <group key={index}>
          <AnimatedSphere 
            position={section.position as [number, number, number]} 
            color={section.color} 
            section={index} 
          />
          <AnimatedText 
            text={section.title} 
            position={[section.position[0], section.position[1] + 2, section.position[2]]} 
            section={index} 
          />
        </group>
      ))}
      
      {/* Floating particles */}
      {Array.from({ length: 50 }, (_, i) => (
        <FloatingParticle 
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 10
          ]}
        />
      ))}
    </>
  );
};

const ThreeScene = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
