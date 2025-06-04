import { motion } from 'framer-motion';
import FeatureTitle from '../atoms/FeatureTitle';
import ElementSearchFilter from '../molecules/ElementSearchFilter';
import ElementGridItem from '../molecules/ElementGridItem';

const ElementInventory = ({ 
  discoveredElements, 
  allElementsCount, 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  categories, 
  handleDragStart,
  filteredElements
}) => (
  <motion.div 
    className="lg:col-span-3 glass-morph rounded-2xl p-4 h-full flex flex-col"
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    <div className="flex items-center justify-between mb-4">
      <FeatureTitle 
        iconName="Package" 
        iconClass="w-5 h-5 mr-2 text-primary" 
        title="Elements" 
        titleClass="text-lg" 
      />
      <div className="text-sm text-purple-200">
        {discoveredElements.length}/{allElementsCount}
      </div>
    </div>

    <ElementSearchFilter
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      categories={categories}
    />

    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
        {filteredElements.map((element) => (
          <ElementGridItem
            key={element.id}
            element={element}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

export default ElementInventory;