const StatCard = ({ label, value }) => (
  <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
    <span className="text-purple-200 text-sm">{label}</span>
    <span className="text-white font-semibold">{value}</span>
  </div>
);

export default StatCard;