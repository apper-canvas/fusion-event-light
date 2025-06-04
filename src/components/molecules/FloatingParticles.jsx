import { useState, useEffect } from 'react';
import Particle from '../atoms/Particle';

const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const updateParticles = () => {
      const currentWindowHeight = window.innerHeight;
      setWindowHeight(currentWindowHeight);
      const newParticles = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          delay: Math.random() * 6
        });
      }
      setParticles(newParticles);
    };

    updateParticles(); // Initial setup
    window.addEventListener('resize', updateParticles);
    return () => window.removeEventListener('resize', updateParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          x={particle.x}
          delay={particle.delay}
          windowHeight={windowHeight}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;