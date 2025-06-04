import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      const newParticles = []
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          delay: Math.random() * 6
        })
      }
      setParticles(newParticles)
    }

    createParticles()
    window.addEventListener('resize', createParticles)
    return () => window.removeEventListener('resize', createParticles)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-accent rounded-full opacity-60"
            style={{
              left: particle.x,
              top: '100%'
            }}
            animate={{
              y: [-100, -window.innerHeight - 100],
              x: [0, Math.random() * 200 - 100]
            }}
            transition={{
              duration: 8,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Main header */}
      <motion.header 
        className="relative z-10 p-4 md:p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3 mb-4 sm:mb-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-glow">
                  <ApperIcon name="Atom" className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-white">
                  Fusion Lab
                </h1>
                <p className="text-purple-200 text-sm">Element Discovery Game</p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="glass-morph px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Zap" className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">Ready to Discover</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main game area */}
      <motion.main 
        className="relative z-10 px-4 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto max-w-7xl">
          <MainFeature />
        </div>
      </motion.main>

      {/* Ambient glow effects */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-48 h-48 bg-secondary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="fixed top-1/2 right-1/3 w-32 h-32 bg-accent/20 rounded-full blur-2xl opacity-60 pointer-events-none" />
    </div>
  )
}

export default Home