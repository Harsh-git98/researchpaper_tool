import React from 'react';
import { motion } from 'framer-motion';

const ResultCard = ({ title, author, summary }) => {
  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className="result-card"
    >
      <h2>{title}</h2>
      <p>By: {author}</p>
      <p>{summary}</p>
    </motion.div>
  );
};

export default ResultCard;
