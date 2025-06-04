import { useRef } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import FeatureTitle from '../atoms/FeatureTitle';
import WorkspaceElement from '../molecules/WorkspaceElement';
import DiscoveryAnimation from '../atoms/DiscoveryAnimation';

const FusionChamber = ({ 
  workspaceElements, 
  handleDragOver, 
  handleWorkspaceDrop, 
  handleDragStart, 
  handleWorkspaceElementDrop, 
  showHintMessage,
  discoveryAnimation
}) => {
  const workspaceRef = useRef(null);

  return (
    <motion.div 
      className="lg:col-span-6 glass-morph rounded-2xl p-6 h-full flex flex-col"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <FeatureTitle 
          iconName="Beaker" 
          iconClass="w-6 h-6 mr-2 text-accent" 
          title="Fusion Chamber" 
          titleClass="text-xl" 
        />
        <motion.button
          onClick={showHintMessage}
          className="flex items-center space-x-2 px-4 py-2 bg-accent hover:bg-yellow-500 rounded-lg text-white font-medium transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Lightbulb" className="w-4 h-4" />
          <span className="hidden sm:inline">Hint</span>
        </motion.button>
      </div>

      <div 
        ref={workspaceRef}
        className="flex-1 relative bg-white/5 rounded-xl border-2 border-dashed border-white/30 overflow-hidden"
        onDragOver={handleDragOver}
        onDrop={handleWorkspaceDrop}
      >
        {workspaceElements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-purple-300 text-center p-8">
            <div>
              <ApperIcon name="MousePointer2" className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Drag elements here to combine them</p>
              <p className="text-sm opacity-75">Start with basic elements: Fire, Water, Earth, Air</p>
            </div>
          </div>
        )}

        {workspaceElements.map((element) => (
          <WorkspaceElement
            key={element.workspaceId}
            element={element}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleWorkspaceElementDrop}
          />
        ))}

        <DiscoveryAnimation discovery={discoveryAnimation} />
      </div>
    </motion.div>
  );
};

export default FusionChamber;