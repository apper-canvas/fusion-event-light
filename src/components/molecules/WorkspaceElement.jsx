import { motion } from 'framer-motion';

const WorkspaceElement = ({ element, onDragStart, onDragOver, onDrop }) => (
  <motion.div
    key={element.workspaceId}
    className="absolute bg-white/20 rounded-xl p-3 cursor-move hover:bg-white/30 transition-all duration-300 border border-white/40 hover:border-primary/60"
    style={{ left: element.x, top: element.y }}
    draggable
    onDragStart={(e) => onDragStart(element, e)}
    onDragOver={onDragOver}
    onDrop={(e) => onDrop(element, e)}
    whileHover={{ scale: 1.1 }}
    whileDrag={{ scale: 0.9, opacity: 0.8 }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    layout
  >
    <div className="text-center min-w-[60px]">
      <div className="text-2xl mb-1">{element.icon}</div>
      <div className="text-xs font-medium text-white">{element.name}</div>
    </div>
  </motion.div>
);

export default WorkspaceElement;