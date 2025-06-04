import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';

const DiscoveryCard = ({ element, index }) => (
  <motion.div
    key={element.id}
    className="flex items-center space-x-3 p-2 bg-white/10 rounded-lg"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <span className="text-xl">{element.icon}</span>
    <div className="flex-1 min-w-0">
      <p className="text-white text-sm font-medium truncate">{element.name}</p>
      <p className="text-purple-300 text-xs capitalize">{element.category}</p>
    </div>
  </motion.div>
);

export default DiscoveryCard;