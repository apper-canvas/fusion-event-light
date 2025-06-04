import { useEffect, useState } from 'react';
import FloatingParticles from '../molecules/FloatingParticles';
import GlowEffect from '../atoms/GlowEffect';

const PageLayout = ({ header, mainContent }) => {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    handleResize(); // Set initial height
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />

      {header}
      {mainContent}

      {/* Ambient glow effects */}
      <GlowEffect positionClass="top-1/4 left-1/4" sizeClass="w-64 h-64" colorClass="bg-primary/20" />
      <GlowEffect positionClass="bottom-1/4 right-1/4" sizeClass="w-48 h-48" colorClass="bg-secondary/20" />
      <GlowEffect positionClass="top-1/2 right-1/3" sizeClass="w-32 h-32" colorClass="bg-accent/20" />
    </div>
  );
};

export default PageLayout;