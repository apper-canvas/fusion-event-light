import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div 
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center shadow-glow"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ApperIcon name="AlertTriangle" className="w-12 h-12 text-white" />
        </motion.div>

        <motion.h1 
          className="text-6xl font-heading font-bold text-white mb-4"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          404
        </motion.h1>

        <motion.h2 
          className="text-2xl font-heading font-semibold text-purple-200 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Element Not Found
        </motion.h2>

        <motion.p 
          className="text-purple-300 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          This combination doesn't exist in our laboratory. Let's return to the fusion chamber and continue discovering new elements!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link 
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5" />
            <span>Back to Lab</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound