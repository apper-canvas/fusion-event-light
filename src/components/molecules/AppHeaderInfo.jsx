import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';

const AppHeaderInfo = () => (
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
);

export default AppHeaderInfo;