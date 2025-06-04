import { motion } from 'framer-motion';

const AppTitle = () => (
  <motion.div 
    className="flex items-center space-x-3 mb-4 sm:mb-0"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <div className="relative">
      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-glow">
        {/* ApperIcon name="Atom" className="w-6 h-6 text-white" /> */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21v-7.5M3.75 21h7.5M3.75 21v-7.5m11.25 7.5v-7.5m11.25 7.5h-7.5m11.25 7.5v-7.5M6 7.5h1.5m7.5 3h.75m-7.5 3h-.75m7.5 3h.75M12 21v-7.5m-4.5 0h9" />
        </svg>
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
);

export default AppTitle;