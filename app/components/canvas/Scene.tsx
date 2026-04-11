"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { Suspense } from "react";
function FloatingObject() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Rotate based on mouse/scroll
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.8}>
        <sphereGeometry args={[1, 64, 64]} />
        {/* THIS IS THE "EXPENSIVE" LOOK: Glass Transmission */}
        <MeshTransmissionMaterial 
          backside 
          samples={16} 
          thickness={0.2} 
          chromaticAberration={0.05} 
          anisotropy={0.1} 
          distortion={0.5} 
          distortionScale={0.1} 
          temporalDistortion={0.1} 
          color="#e2e8f0"
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#0a0a0a]">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <FloatingObject />
          <Environment preset="night" />
          <spotLight position={[10, 10, 10]} penumbra={1} intensity={2} color="#16a34a" />
        </Suspense>
      </Canvas>
    </div>
  );
}