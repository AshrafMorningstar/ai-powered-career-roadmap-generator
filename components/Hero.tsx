
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight, Mail } from 'lucide-react';

const RocketModel = () => {
  const meshRef = useRef<any>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.5, 1.5, 4, 32]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          emissive="#1d4ed8" 
          emissiveIntensity={0.8} 
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Base */}
      <mesh position={[0, -1, 0]}>
        <coneGeometry args={[0.6, 0.8, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Tip */}
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.3, 0.6, 32]} />
        <meshStandardMaterial color="#ef4444" emissive="#991b1b" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

interface HeroProps {
  onCTA: (target: 'roadmap' | 'contact') => void;
}

const Hero: React.FC<HeroProps> = ({ onCTA }) => {
  return (
    <div className="relative h-[90vh] flex items-center overflow-hidden bg-slate-900 rounded-3xl mb-12 shadow-2xl">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Canvas gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <Suspense fallback={null}>
            <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
              <RocketModel />
            </Float>
            <mesh position={[-4, 2, -2]}>
              <sphereGeometry args={[1, 32, 32]} />
              <MeshDistortMaterial color="#2563eb" speed={2} distort={0.5} />
            </mesh>
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 px-8 md:px-20 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold border border-blue-500/30 mb-6 backdrop-blur-md"
          >
            <Rocket className="w-4 h-4 mr-2" />
            Empowering Future Cloud Engineers
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight"
          >
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Cloud Landscape</span>
          </h1 >
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed"
          >
            A comprehensive, project-driven journey through AWS, Azure, Networking, and DevOps. Built by 
            <span className="text-white font-semibold"> Ashraf Morningstar</span> to get you hired in 90 days.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCTA('roadmap')}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center shadow-lg shadow-blue-600/30 transition-all"
            >
              Start Roadmap
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCTA('contact')}
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all"
            >
              Contact Me
              <Mail className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-600/20 blur-[120px] rounded-full -mr-20 -mb-20"></div>
    </div>
  );
};

export default Hero;
