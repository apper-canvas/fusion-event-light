import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { elementService } from '../services'
import { combinationService } from '../services'
import { playerProgressService } from '../services'

const MainFeature = () => {
  const [elements, setElements] = useState([])
  const [combinations, setCombinations] = useState([])
  const [playerProgress, setPlayerProgress] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [draggedElement, setDraggedElement] = useState(null)
  const [dropTarget, setDropTarget] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showHint, setShowHint] = useState(false)
  const [discoveryAnimation, setDiscoveryAnimation] = useState(null)
  const [workspaceElements, setWorkspaceElements] = useState([])
  const [attemptedCombinations, setAttemptedCombinations] = useState(new Set())
  
  const workspaceRef = useRef(null)
  const dragRef = useRef(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [elementsData, combinationsData, progressData] = await Promise.all([
          elementService.getAll(),
          combinationService.getAll(),
          playerProgressService.getAll()
        ])
        setElements(elementsData || [])
        setCombinations(combinationsData || [])
        setPlayerProgress(progressData?.[0] || {
          discoveredElements: ['fire', 'water', 'earth', 'air'],
          totalDiscoveries: 0,
          hintsUsed: 0,
          playTime: 0,
          achievements: []
        })
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load game data")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const discoveredElements = elements.filter(element => 
    playerProgress?.discoveredElements?.includes(element.id) || false
  )

  const filteredElements = discoveredElements.filter(element => {
    const matchesSearch = element.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || element.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...new Set(elements.map(e => e.category))]

  const handleDragStart = (element, e) => {
    setDraggedElement(element)
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', element.id)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleWorkspaceDrop = (e) => {
    e.preventDefault()
    if (!draggedElement) return

    const rect = workspaceRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newElement = {
      ...draggedElement,
      x: x - 32,
      y: y - 32,
      workspaceId: Date.now()
    }

    setWorkspaceElements(prev => [...prev, newElement])
    setDraggedElement(null)
  }

  const handleElementCombination = async (element1, element2) => {
    const combinationKey = [element1.id, element2.id].sort().join('-')
    
    if (attemptedCombinations.has(combinationKey)) {
      return
    }

    setAttemptedCombinations(prev => new Set([...prev, combinationKey]))

    const combination = combinations.find(combo => 
      (combo.element1 === element1.id && combo.element2 === element2.id) ||
      (combo.element1 === element2.id && combo.element2 === element1.id)
    )

    if (combination) {
      const resultElement = elements.find(e => e.id === combination.result)
      
      if (resultElement && !playerProgress.discoveredElements.includes(resultElement.id)) {
        // New discovery!
        const updatedProgress = {
          ...playerProgress,
          discoveredElements: [...playerProgress.discoveredElements, resultElement.id],
          totalDiscoveries: playerProgress.totalDiscoveries + 1
        }
        
        setPlayerProgress(updatedProgress)
        await playerProgressService.update(playerProgress.id || 1, updatedProgress)
        
        setDiscoveryAnimation(resultElement)
        toast.success(`🎉 Discovered: ${resultElement.name}!`, {
          autoClose: 4000,
          className: "!bg-gradient-to-r !from-secondary !to-secondary-dark"
        })

        setTimeout(() => setDiscoveryAnimation(null), 2000)
      } else if (resultElement) {
        toast.info(`Combined into: ${resultElement.name}`)
      }
    } else {
      toast.error("❌ Invalid combination", {
        autoClose: 2000,
        className: "!bg-gradient-to-r !from-red-500 !to-red-600"
      })
    }
  }

  const handleWorkspaceElementDrop = (droppedOn, e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (draggedElement && droppedOn.id !== draggedElement.id) {
      handleElementCombination(draggedElement, droppedOn)
      
      // Remove both elements from workspace after combination
      setWorkspaceElements(prev => 
        prev.filter(el => el.workspaceId !== droppedOn.workspaceId)
      )
    }
    setDraggedElement(null)
  }

  const getRandomHint = () => {
    const undiscoveredCombinations = combinations.filter(combo => {
      const result = elements.find(e => e.id === combo.result)
      return result && !playerProgress.discoveredElements.includes(result.id)
    })

    if (undiscoveredCombinations.length === 0) {
      return "You've discovered everything! Congratulations!"
    }

    const randomCombo = undiscoveredCombinations[Math.floor(Math.random() * undiscoveredCombinations.length)]
    const elem1 = elements.find(e => e.id === randomCombo.element1)
    const elem2 = elements.find(e => e.id === randomCombo.element2)
    
    return `Try combining ${elem1?.name} + ${elem2?.name}`
  }

  const showHintMessage = async () => {
    const hint = getRandomHint()
    setShowHint(true)
    toast.info(`💡 Hint: ${hint}`, { autoClose: 5000 })
    
    const updatedProgress = {
      ...playerProgress,
      hintsUsed: playerProgress.hintsUsed + 1
    }
    setPlayerProgress(updatedProgress)
    await playerProgressService.update(playerProgress.id || 1, updatedProgress)
    
    setTimeout(() => setShowHint(false), 3000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <ApperIcon name="AlertTriangle" className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <p className="text-red-300 text-lg">Error loading game: {error}</p>
      </div>
    )
  }

  const progressPercentage = Math.round((discoveredElements.length / elements.length) * 100) || 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
      {/* Element Inventory Sidebar */}
      <motion.div 
        className="lg:col-span-3 glass-morph rounded-2xl p-4 h-full flex flex-col"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-lg text-white flex items-center">
            <ApperIcon name="Package" className="w-5 h-5 mr-2 text-primary" />
            Elements
          </h2>
          <div className="text-sm text-purple-200">
            {discoveredElements.length}/{elements.length}
          </div>
        </div>

        {/* Search and Filter */}
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

        {/* Elements Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
            {filteredElements.map((element) => (
              <motion.div
                key={element.id}
                className="group relative bg-white/10 rounded-xl p-3 cursor-grab active:cursor-grabbing hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-primary/50"
                draggable
                onDragStart={(e) => handleDragStart(element, e)}
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
            ))}
          </div>
        </div>
      </motion.div>

      {/* Central Experimentation Canvas */}
      <motion.div 
        className="lg:col-span-6 glass-morph rounded-2xl p-6 h-full flex flex-col"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-bold text-xl text-white flex items-center">
            <ApperIcon name="Beaker" className="w-6 h-6 mr-2 text-accent" />
            Fusion Chamber
          </h2>
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

        {/* Workspace */}
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

          {/* Workspace Elements */}
          {workspaceElements.map((element) => (
            <motion.div
              key={element.workspaceId}
              className="absolute bg-white/20 rounded-xl p-3 cursor-move hover:bg-white/30 transition-all duration-300 border border-white/40 hover:border-primary/60"
              style={{ left: element.x, top: element.y }}
              draggable
              onDragStart={(e) => handleDragStart(element, e)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleWorkspaceElementDrop(element, e)}
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
          ))}

          {/* Discovery Animation */}
          <AnimatePresence>
            {discoveryAnimation && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <motion.div
                  className="bg-gradient-to-r from-secondary to-secondary-dark rounded-2xl p-8 text-center shadow-2xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 0.6, repeat: 2 }}
                >
                  <div className="text-6xl mb-4">{discoveryAnimation.icon}</div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">New Discovery!</h3>
                  <p className="text-lg text-white">{discoveryAnimation.name}</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Discovery Journal */}
      <motion.div 
        className="lg:col-span-3 glass-morph rounded-2xl p-4 h-full flex flex-col"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-lg text-white flex items-center">
            <ApperIcon name="BookOpen" className="w-5 h-5 mr-2 text-secondary" />
            Progress
          </h2>
        </div>

        {/* Progress Ring */}
        <div className="text-center mb-6">
          <div className="relative w-24 h-24 mx-auto">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - progressPercentage / 100)}`}
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-white">{progressPercentage}%</span>
            </div>
          </div>
          <p className="text-sm text-purple-200 mt-2">Discovery Progress</p>
        </div>

        {/* Stats */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
            <span className="text-purple-200 text-sm">Discovered</span>
            <span className="text-white font-semibold">{discoveredElements.length}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
            <span className="text-purple-200 text-sm">Hints Used</span>
            <span className="text-white font-semibold">{playerProgress?.hintsUsed || 0}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
            <span className="text-purple-200 text-sm">Total Elements</span>
            <span className="text-white font-semibold">{elements.length}</span>
          </div>
        </div>

        {/* Recent Discoveries */}
        <div className="flex-1">
          <h3 className="font-medium text-white mb-3 flex items-center">
            <ApperIcon name="Clock" className="w-4 h-4 mr-2 text-accent" />
            Recent Discoveries
          </h3>
          <div className="space-y-2 overflow-y-auto custom-scrollbar max-h-40">
            {discoveredElements.slice(-5).reverse().map((element, index) => (
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
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default MainFeature