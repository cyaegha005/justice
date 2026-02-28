"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useState, useRef, useEffect, useCallback } from "react";
import { Vector3, OctahedronGeometry, EdgesGeometry, LineBasicMaterial, LineSegments, MeshPhongMaterial, Mesh } from "three";
import { UploadPanel } from "./panels/UploadPanel";
import { LearningPanel } from "./panels/LearningPanel";
import { QuizPanel } from "./panels/QuizPanel";
import { BookshelfPanel } from "./panels/BookshelfPanel";
import { AITutorChatPanel } from "./panels/AITutorChatPanel";

// Grid background - exactly like reference
function GridBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        zIndex: 0
      }}
    />
  );
}

// Scene overlay - exactly like reference
function SceneOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(15, 23, 42, 0.3) 100%)',
        zIndex: 2
      }}
    />
  );
}

// Object glow effect - exactly like reference
function ObjectGlow({ visible, position }: { visible: boolean; position: { x: number; y: number } }) {
  if (!visible) return null;
  
  return (
    <div 
      className="fixed pointer-events-none animate-glow"
      style={{
        top: position.y,
        left: position.x,
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        zIndex: 3
      }}
    />
  );
}

// Crystal with exact reference design
function Crystal({ position, color, id, onClick, isSelected }: {
  position: [number, number, number];
  color: number;
  id: string;
  onClick: () => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Floating animation - exactly like reference
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.2;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
    }
  });

  // Create geometry and materials
  const geometry = new OctahedronGeometry(0.5, 0);
  const edgesGeometry = new EdgesGeometry(geometry);

  return (
    <group position={position}>
      {/* Main crystal mesh */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
        scale={hovered ? 1.1 : 1}
      >
        <octahedronGeometry args={[0.5, 0]} />
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 0.8 : 0.3}
          transparent
          opacity={0.8}
          shininess={100}
        />
      </mesh>
      
      {/* Wireframe edges - exactly like reference */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.6} />
      </lineSegments>
    </group>
  );
}

// Camera controller - mouse follow like reference
function CameraController() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    // Smooth camera follow - exactly like reference
    camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouseRef.current.y * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene({ onCrystalClick, selectedCrystal }: {
  onCrystalClick: (id: string, color: number) => void;
  selectedCrystal: string | null;
}) {
  const crystals = [
    { id: 'upload', position: [-2, 1, 0] as [number, number, number], color: 0x6366f1, label: 'Upload' },
    { id: 'learning', position: [0, -1, -1] as [number, number, number], color: 0x10b981, label: 'Learning' },
    { id: 'quiz', position: [2, 0.5, 0.5] as [number, number, number], color: 0xf472b6, label: 'Quiz' },
    { id: 'bookshelf', position: [-1.5, 0, 2] as [number, number, number], color: 0x8b5cf6, label: 'Bookshelf' },
    { id: 'aitutor', position: [1.5, 1.5, 1] as [number, number, number], color: 0xf59e0b, label: 'AI Tutor' },
  ];

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      <CameraController />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color={0x6366f1} distance={100} />
      <pointLight position={[-5, -5, 5]} intensity={1} color={0xf472b6} distance={100} />
      
      {crystals.map((crystal) => (
        <Crystal
          key={crystal.id}
          position={crystal.position}
          color={crystal.color}
          id={crystal.id}
          isSelected={selectedCrystal === crystal.id}
          onClick={() => onCrystalClick(crystal.id, crystal.color)}
        />
      ))}
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
    </>
  );
}

// Glass panel - exactly like reference
function GlassPanel({ 
  isOpen, 
  onClose, 
  title, 
  subtitle,
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div 
      className="fixed top-0 h-full flex flex-col transition-all duration-500"
      style={{
        right: isOpen ? 0 : '-450px',
        width: '450px',
        zIndex: 100,
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.7) 100%)',
        backdropFilter: 'blur(20px)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Header - exactly like reference */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'
            }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-white font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h3>
            <p className="text-white/50 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{subtitle}</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 scroll-thin">
        {children}
      </div>
    </div>
  );
}

// Object hint - exactly like reference
function ObjectHint() {
  return (
    <div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-sm animate-pulse-slow"
      style={{
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'rgba(255, 255, 255, 0.7)',
        zIndex: 50,
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      }}
    >
      Click floating knowledge crystals to start learning
    </div>
  );
}

export function World3D() {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [selectedCrystal, setSelectedCrystal] = useState<string | null>(null);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [showGlow, setShowGlow] = useState(false);

  const handleCrystalClick = useCallback((id: string, color: number) => {
    setSelectedCrystal(id);
    setActivePanel(id);
    setShowGlow(true);
    
    // Position glow at crystal screen position (approximate)
    const positions: Record<string, { x: number; y: number }> = {
      upload: { x: window.innerWidth * 0.3, y: window.innerHeight * 0.4 },
      learning: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.6 },
      quiz: { x: window.innerWidth * 0.7, y: window.innerHeight * 0.45 },
      bookshelf: { x: window.innerWidth * 0.35, y: window.innerHeight * 0.35 },
      aitutor: { x: window.innerWidth * 0.65, y: window.innerHeight * 0.3 },
    };
    setGlowPosition(positions[id] || { x: window.innerWidth / 2, y: window.innerHeight / 2 });
  }, []);

  const handleClosePanel = useCallback(() => {
    setActivePanel(null);
    setSelectedCrystal(null);
    setShowGlow(false);
  }, []);

  const panelInfo: Record<string, { title: string; subtitle: string }> = {
    upload: { title: 'Upload Materials', subtitle: 'Convert documents to 3D learning experience' },
    learning: { title: 'Learning Content', subtitle: 'Explore your knowledge world' },
    quiz: { title: 'Knowledge Quiz', subtitle: 'Test your learning progress' },
    bookshelf: { title: 'Bookshelf Resources', subtitle: 'Browse your learning materials' },
    aitutor: { title: 'AI Tutor', subtitle: 'Intelligent learning assistant' },
  };

  const currentPanel = activePanel ? panelInfo[activePanel] : { title: '', subtitle: '' };

  return (
    <div 
      className="fixed inset-0 overflow-hidden"
      style={{ 
        background: '#0f172a',
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* Google Font */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" 
        rel="stylesheet" 
      />
      
      <GridBackground />
      
      {/* Canvas container - exactly like reference */}
      <div className="fixed inset-0" style={{ zIndex: 1 }}>
        <Canvas
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene 
              onCrystalClick={handleCrystalClick}
              selectedCrystal={selectedCrystal}
            />
          </Suspense>
        </Canvas>
      </div>
      
      <SceneOverlay />
      
      {/* Object glow effect */}
      <ObjectGlow visible={showGlow} position={glowPosition} />
      
      {/* Object hint */}
      <ObjectHint />
      
      {/* Glass panel */}
      <GlassPanel
        isOpen={!!activePanel}
        onClose={handleClosePanel}
        title={currentPanel.title}
        subtitle={currentPanel.subtitle}
      >
        {activePanel === 'upload' && <UploadPanel />}
        {activePanel === 'learning' && <LearningPanel />}
        {activePanel === 'quiz' && <QuizPanel />}
        {activePanel === 'bookshelf' && <BookshelfPanel />}
        {activePanel === 'aitutor' && <AITutorChatPanel />}
      </GlassPanel>
    </div>
  );
}
