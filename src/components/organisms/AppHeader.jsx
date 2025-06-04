import { motion } from 'framer-motion';
import AppTitle from '../atoms/AppTitle';
import AppHeaderInfo from '../molecules/AppHeaderInfo';

const AppHeader = () => (
  <motion.header 
    className="relative z-10 p-4 md:p-6"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <AppTitle />
        <AppHeaderInfo />
      </div>
    </div>
  </motion.header>
);

export default AppHeader;