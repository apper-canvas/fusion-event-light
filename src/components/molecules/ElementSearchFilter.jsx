import ApperIcon from '../ApperIcon';

const ElementSearchFilter = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) => (
  <div className="space-y-3 mb-4">
    <div className="relative">
      <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-300" />
      <input
        type="text"
        placeholder="Search elements..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
    
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {categories.map(category => (
        <option key={category} value={category} className="bg-purple-800 text-white">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </option>
      ))}
    </select>
  </div>
);

export default ElementSearchFilter;