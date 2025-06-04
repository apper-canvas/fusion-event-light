const ProgressBar = ({ percentage }) => (
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
        strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
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
      <span className="text-xl font-bold text-white">{percentage}%</span>
    </div>
  </div>
);

export default ProgressBar;