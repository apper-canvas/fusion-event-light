import { motion } from 'framer-motion';

const GameTemplate = ({ children }) => (
  <motion.main 
    className="relative z-10 px-4 pb-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    <div className="container mx-auto max-w-7xl">
      {children}
    </div>
  </motion.main>
);

export default GameTemplate;