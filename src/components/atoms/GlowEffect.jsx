const GlowEffect = ({ positionClass, sizeClass, colorClass }) => (
  <div className={`fixed ${positionClass} ${sizeClass} ${colorClass} rounded-full blur-3xl opacity-50 pointer-events-none`} />
);

export default GlowEffect;