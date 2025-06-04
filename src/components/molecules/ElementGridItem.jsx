import { motion } from 'framer-motion';

const ElementGridItem = ({ element, onDragStart }) => (
  <motion.div
    key={element.id}
    className="group relative bg-white/10 rounded-xl p-3 cursor-grab active:cursor-grabbing hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-primary/50"
    draggable
    onDragStart={(e) => onDragStart(element, e)}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    layout
  >
    <div className="text-center">
      <div className="text-2xl mb-1">{element.icon}</div>
      <div className="text-xs font-medium text-white truncate">{element.name}</div>
      <div className="text-xs text-purple-300 capitalize">{element.category}</div>
    </div>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      initial={false}
    />
  </motion.div>
);

export default ElementGridItem;