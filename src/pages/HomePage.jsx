import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import AppHeader from '../components/organisms/AppHeader';
import GameTemplate from '../components/templates/GameTemplate';
import PageLayout from '../components/templates/PageLayout';
import ElementInventory from '../components/organisms/ElementInventory';
import FusionChamber from '../components/organisms/FusionChamber';
import DiscoveryJournal from '../components/organisms/DiscoveryJournal';
import ApperIcon from '../components/ApperIcon'; // Still needed for loading/error states
import { elementService, combinationService, playerProgressService } from '../services';

const HomePage = () => {
  const [elements, setElements] = useState([]);
  const [combinations, setCombinations] = useState([]);
  const [playerProgress, setPlayerProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draggedElement, setDraggedElement] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [discoveryAnimation, setDiscoveryAnimation] = useState(null);
  const [workspaceElements, setWorkspaceElements] = useState([]);
  const [attemptedCombinations, setAttemptedCombinations] = useState(new Set());
  
  const workspaceRef = useRef(null); // Ref for FusionChamber, passed down

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [elementsData, combinationsData, progressData] = await Promise.all([
          elementService.getAll(),
          combinationService.getAll(),
          playerProgressService.getAll()
        ]);
        setElements(elementsData || []);
        setCombinations(combinationsData || []);
        setPlayerProgress(progressData?.[0] || {
          discoveredElements: ['fire', 'water', 'earth', 'air'],
          totalDiscoveries: 0,
          hintsUsed: 0,
          playTime: 0,
          achievements: []
        });
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load game data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const discoveredElements = elements.filter(element => 
    playerProgress?.discoveredElements?.includes(element.id) || false
  );

  const filteredElements = discoveredElements.filter(element => {
    const matchesSearch = element.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || element.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(elements.map(e => e.category))];

  const handleDragStart = (element, e) => {
    setDraggedElement(element);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', element.id);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleWorkspaceDrop = (e) => {
    e.preventDefault();
    if (!draggedElement) return;

    // Use current element from workspaceRef instead of direct DOM manipulation
    const rect = workspaceRef.current ? workspaceRef.current.getBoundingClientRect() : { left: 0, top: 0 };
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElement = {
      ...draggedElement,
      x: x - 32,
      y: y - 32,
      workspaceId: Date.now()
    };

    setWorkspaceElements(prev => [...prev, newElement]);
    setDraggedElement(null);
  };

  const handleElementCombination = async (element1, element2) => {
    const combinationKey = [element1.id, element2.id].sort().join('-');
    
    if (attemptedCombinations.has(combinationKey)) {
      return;
    }

    setAttemptedCombinations(prev => new Set([...prev, combinationKey]));

    const combination = combinations.find(combo => 
      (combo.element1 === element1.id && combo.element2 === element2.id) ||
      (combo.element1 === element2.id && combo.element2 === element1.id)
    );

    if (combination) {
      const resultElement = elements.find(e => e.id === combination.result);
      
      if (resultElement && playerProgress && !playerProgress.discoveredElements.includes(resultElement.id)) {
        // New discovery!
        const updatedProgress = {
          ...playerProgress,
          discoveredElements: [...playerProgress.discoveredElements, resultElement.id],
          totalDiscoveries: playerProgress.totalDiscoveries + 1
        };
        
        setPlayerProgress(updatedProgress);
        await playerProgressService.update(playerProgress.id || 1, updatedProgress);
        
        setDiscoveryAnimation(resultElement);
        toast.success(`🎉 Discovered: ${resultElement.name}!`, {
          autoClose: 4000,
          className: "!bg-gradient-to-r !from-secondary !to-secondary-dark"
        });

        setTimeout(() => setDiscoveryAnimation(null), 2000);
      } else if (resultElement) {
        toast.info(`Combined into: ${resultElement.name}`);
      }
    } else {
      toast.error("❌ Invalid combination", {
        autoClose: 2000,
        className: "!bg-gradient-to-r !from-red-500 !to-red-600"
      });
    }
  };

  const handleWorkspaceElementDrop = (droppedOn, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedElement && droppedOn.workspaceId !== draggedElement.workspaceId) {
      handleElementCombination(draggedElement, droppedOn);
      
      setWorkspaceElements(prev => 
        prev.filter(el => el.workspaceId !== droppedOn.workspaceId && el.workspaceId !== draggedElement.workspaceId)
      );
    }
    setDraggedElement(null);
  };

  const getRandomHint = () => {
    const undiscoveredCombinations = combinations.filter(combo => {
      const result = elements.find(e => e.id === combo.result);
      return result && playerProgress && !playerProgress.discoveredElements.includes(result.id);
    });

    if (undiscoveredCombinations.length === 0) {
      return "You've discovered everything! Congratulations!";
    }

    const randomCombo = undiscoveredCombinations[Math.floor(Math.random() * undiscoveredCombinations.length)];
    const elem1 = elements.find(e => e.id === randomCombo.element1);
    const elem2 = elements.find(e => e.id === randomCombo.element2);
    
    return `Try combining ${elem1?.name} + ${elem2?.name}`;
  };

  const showHintMessage = async () => {
    const hint = getRandomHint();
    toast.info(`💡 Hint: ${hint}`, { autoClose: 5000 });
    
    if (playerProgress) {
      const updatedProgress = {
        ...playerProgress,
        hintsUsed: playerProgress.hintsUsed + 1
      };
      setPlayerProgress(updatedProgress);
      await playerProgressService.update(playerProgress.id || 1, updatedProgress);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <ApperIcon name="AlertTriangle" className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <p className="text-red-300 text-lg">Error loading game: {error}</p>
      </div>
    );
  }

  const progressPercentage = Math.round((discoveredElements.length / elements.length) * 100) || 0;

  const headerContent = <AppHeader />;
  const mainContent = (
    <GameTemplate>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
        <ElementInventory 
          discoveredElements={discoveredElements}
          allElementsCount={elements.length}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          handleDragStart={handleDragStart}
          filteredElements={filteredElements}
        />
        <FusionChamber 
          workspaceElements={workspaceElements}
          handleDragOver={handleDragOver}
          handleWorkspaceDrop={handleWorkspaceDrop}
          handleDragStart={handleDragStart}
          handleWorkspaceElementDrop={handleWorkspaceElementDrop}
          showHintMessage={showHintMessage}
          discoveryAnimation={discoveryAnimation}
          ref={workspaceRef} // Pass ref here
        />
        <DiscoveryJournal 
          progressPercentage={progressPercentage}
          discoveredElements={discoveredElements}
          elementsCount={elements.length}
          hintsUsed={playerProgress?.hintsUsed}
        />
      </div>
    </GameTemplate>
  );

  return (
    <PageLayout header={headerContent} mainContent={mainContent} />
  );
};

export default HomePage;