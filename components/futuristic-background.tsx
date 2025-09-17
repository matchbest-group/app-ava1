"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function FuturisticBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  
  // 3D Scroll-triggered transforms for different elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15])
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -10])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.05, 0.08, 0.05, 0.02])

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0" style={{ perspective: '1000px' }}>
      {/* 3D Scroll-Responsive Background Elements */}
      
      {/* 3D Grid Pattern with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          y: y1, 
          rotateX,
          opacity,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </motion.div>

      {/* 3D Floating Geometric Shapes with Continuous Animation + Scroll Effects */}
      <motion.div 
        className="absolute top-20 right-20 w-32 h-32"
        style={{ 
          y: y2, 
          rotateY,
          scale,
          transformStyle: 'preserve-3d'
        }}
        animate={{
          rotateZ: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400/15 to-cyan-500/15 backdrop-blur-sm border border-blue-300/20 shadow-lg"></div>
      </motion.div>

      <motion.div 
        className="absolute bottom-32 left-16 w-20 h-20"
        style={{ 
          y: y3, 
          rotateX: useTransform(scrollYProgress, [0, 1], [0, -20]),
          rotateZ: useTransform(scrollYProgress, [0, 1], [0, 10]),
          transformStyle: 'preserve-3d'
        }}
        animate={{
          rotate: [45, 135, 225, 315, 45],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-blue-400/12 to-purple-500/12 backdrop-blur-sm border border-blue-300/20 rounded-lg shadow-lg"></div>
      </motion.div>

      {/* Additional 3D Elements for Depth with Animations */}
      <motion.div 
        className="absolute top-1/2 left-10 w-16 h-16"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [0, -150]),
          rotateY: useTransform(scrollYProgress, [0, 1], [0, 25]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.03, 0.08, 0.04]),
          transformStyle: 'preserve-3d'
        }}
        animate={{
          rotateX: [0, 180, 360],
          scale: [0.8, 1.1, 0.8],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-indigo-400/10 to-blue-500/10 backdrop-blur-sm border border-indigo-300/20 rounded-lg shadow-lg"></div>
      </motion.div>

      <motion.div 
        className="absolute top-1/3 right-1/3 w-12 h-12"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [0, 80]),
          rotateX: useTransform(scrollYProgress, [0, 1], [0, 30]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]),
          transformStyle: 'preserve-3d'
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-t from-cyan-400/12 to-blue-400/12 backdrop-blur-sm border border-cyan-300/20 shadow-lg"></div>
      </motion.div>

      {/* New Animated 3D Shapes */}
      <motion.div 
        className="absolute bottom-20 right-1/4 w-14 h-14"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [0, -180]),
          rotateZ: useTransform(scrollYProgress, [0, 1], [0, 15]),
          transformStyle: 'preserve-3d'
        }}
        animate={{
          rotateY: [0, 360],
          x: [-10, 10, -10],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-emerald-400/12 to-teal-500/12 backdrop-blur-sm border border-emerald-300/20 rotate-45 rounded-lg shadow-lg"></div>
      </motion.div>

      <motion.div 
        className="absolute top-10 left-1/3 w-10 h-10"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [0, 120]),
          rotateX: useTransform(scrollYProgress, [0, 1], [0, -15]),
          transformStyle: 'preserve-3d'
        }}
        animate={{
          rotate: [0, 120, 240, 360],
          scale: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div 
          className="w-full h-full bg-gradient-to-t from-purple-400/15 to-pink-500/15 backdrop-blur-sm border border-purple-300/20 shadow-lg"
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
        ></div>
      </motion.div>

      {/* 3D Animated Lines with Depth */}
      <motion.svg 
        className="absolute inset-0 w-full h-full"
        style={{ 
          y: y1,
          rotateX: useTransform(scrollYProgress, [0, 1], [0, 5]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.08, 0.12, 0.06]),
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.path
          d="M0,200 Q400,150 800,200 T1200,200"
          fill="none"
          stroke="rgba(59, 130, 246, 0.15)"
          strokeWidth="1"
          style={{
            pathLength: useTransform(scrollYProgress, [0, 0.5], [0, 1])
          }}
        />
        <motion.path
          d="M0,400 Q600,350 1200,400 T1800,400"
          fill="none"
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth="1"
          style={{
            pathLength: useTransform(scrollYProgress, [0.2, 0.7], [0, 1])
          }}
        />
      </motion.svg>

      {/* Animated Floating Particles with 3D Scroll */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
          style={{
            left: `${15 + i * 12}%`,
            top: `${20 + i * 8}%`,
            y: useTransform(scrollYProgress, [0, 1], [0, -100 - i * 20]),
            rotateZ: useTransform(scrollYProgress, [0, 1], [0, 360]),
            transformStyle: 'preserve-3d'
          }}
          animate={{
            y: [-20, -40, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Subtle 3D Background Layers for Depth */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/2 via-transparent to-purple-500/2"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [0, -50]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.03]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.02, 0.05, 0.03])
        }}
      />
    </div>
  )
}
