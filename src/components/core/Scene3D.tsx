"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Text, Center } from "@react-three/drei";
import { Suspense } from "react";

function Classroom() {
  return (
    <group>
      <Float floatIntensity={2} rotationIntensity={0.5}>
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.1, 1.5]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>
        
        <mesh position={[0, 1.5, -0.5]} castShadow>
          <boxGeometry args={[0.05, 1, 1]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        
        <mesh position={[0, 2.05, -0.5]} castShadow>
          <boxGeometry args={[1.5, 0.05, 0.1]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>
      </Float>
      
      <mesh position={[-3, 0, -2]} rotation={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 2, 0.3]} />
        <meshStandardMaterial color="#4A5568" />
      </mesh>
      
      <mesh position={[3, 0, -2]} rotation={[0, -0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 2, 0.3]} />
        <meshStandardMaterial color="#4A5568" />
      </mesh>
      
      <mesh position={[0, 0, -3]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 3, 4]} />
        <meshStandardMaterial color="#2D3748" />
      </mesh>
      
      <mesh position={[0, 1.5, -2.9]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color="#F7FAFC" />
      </mesh>
      
      <Center position={[0, 1.5, -2.8]}>
        <Text
          fontSize={0.15}
          color="#2D3748"
          anchorX="center"
          anchorY="middle"
        >
          FocusFlow 3D
        </Text>
      </Center>
      
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#E2E8F0" />
      </mesh>
    </group>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-neutral-600 dark:text-neutral-400">加载 3D 场景中...</div>
    </div>
  );
}

export function Scene3D() {
  return (
    <div className="w-full h-96 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
      <Canvas shadows camera={{ position: [5, 3, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[-5, 5, 5]} intensity={0.5} />
          
          <Classroom />
          
          <Environment preset="warehouse" />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={15}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}