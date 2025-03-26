import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="footer"
    >
      <p>&copy; 2025 Research Tool</p>
    </motion.div>
  );
};

export default Footer;
