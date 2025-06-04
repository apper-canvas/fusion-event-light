import { motion } from 'framer-motion';

const Particle = ({ x, delay, windowHeight }) => (
  <motion.div
    className="absolute w-1 h-1 bg-accent rounded-full opacity-60"
    style={{
      left: x,
      top: '100%'
    }}
    animate={{
      y: [-100, -windowHeight - 100],
      x: [0, Math.random() * 200 - 100]
    }}
    transition={{
      duration: 8,
      delay: delay,
      repeat: Infinity,
      ease: 'linear'
    }}
  />
);

export default Particle;