import ApperIcon from '../ApperIcon';

const FeatureTitle = ({ iconName, iconClass, title, titleClass }) => (
  <h2 className={`font-heading font-bold ${titleClass} text-white flex items-center`}>
    <ApperIcon name={iconName} className={`mr-2 ${iconClass}`} />
    {title}
  </h2>
);

export default FeatureTitle;