import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import FeatureTitle from '../atoms/FeatureTitle';
import ProgressBar from '../atoms/ProgressBar';
import StatCard from '../atoms/StatCard';
import DiscoveryCard from '../atoms/DiscoveryCard';

const DiscoveryJournal = ({ 
  progressPercentage, 
  discoveredElements, 
  elementsCount, 
  hintsUsed 
}) => (
  <motion.div 
    className="lg:col-span-3 glass-morph rounded-2xl p-4 h-full flex flex-col"
    initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.4 }}
  >
    <div className="flex items-center justify-between mb-4">
      <FeatureTitle 
        iconName="BookOpen" 
        iconClass="w-5 h-5 mr-2 text-secondary" 
        title="Progress" 
        titleClass="text-lg" 
      />
    </div>

    <div className="text-center mb-6">
      <ProgressBar percentage={progressPercentage} />
      <p className="text-sm text-purple-200 mt-2">Discovery Progress</p>
    </div>

    <div className="space-y-3 mb-6">
      <StatCard label="Discovered" value={discoveredElements.length} />
      <StatCard label="Hints Used" value={hintsUsed || 0} />
      <StatCard label="Total Elements" value={elementsCount} />
    </div>

    <div className="flex-1">
      <h3 className="font-medium text-white mb-3 flex items-center">
        <ApperIcon name="Clock" className="w-4 h-4 mr-2 text-accent" />
        Recent Discoveries
      </h3>
      <div className="space-y-2 overflow-y-auto custom-scrollbar max-h-40">
        {discoveredElements.slice(-5).reverse().map((element, index) => (
          <DiscoveryCard key={element.id} element={element} index={index} />
        ))}
      </div>
    </div>
  </motion.div>
);

export default DiscoveryJournal;