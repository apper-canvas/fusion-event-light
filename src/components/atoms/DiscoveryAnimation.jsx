import { motion, AnimatePresence } from 'framer-motion';

const DiscoveryAnimation = ({ discovery }) => (
  <AnimatePresence>
    {discovery && (
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
      >
        <motion.div
          className="bg-gradient-to-r from-secondary to-secondary-dark rounded-2xl p-8 text-center shadow-2xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 0.6, repeat: 2 }}
        >
          <div className="text-6xl mb-4">{discovery.icon}</div>
          <h3 className="text-2xl font-heading font-bold text-white mb-2">New Discovery!</h3>
          <p className="text-lg text-white">{discovery.name}</p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default DiscoveryAnimation;