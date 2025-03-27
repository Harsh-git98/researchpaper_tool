import React, { useState } from 'react';
import { motion } from 'framer-motion';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
    }}>
      
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: '#333',
          color: 'white',
          padding: '20px',
        }}
      >
        <h1>Research Paper Research Tool</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#f0f0f0',
          borderRadius: '5px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for papers..."
          style={{
            padding: '10px',
            border: 'none',
            borderRadius: '5px 0 0 5px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px',
            border: 'none',
            borderRadius: '0 5px 5px 0',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </motion.div>

      {/* Results */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '20px',
      }}>
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            margin: '20px',
            padding: '20px',
            width: '300px',
            backgroundColor: '#f0f0f0',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2>Example Paper</h2>
          <p>By: John Doe</p>
          <p>This is a summary of an example paper.</p>
        </motion.div>
       
      </div>

      
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        style={{
          backgroundColor: '#333',
          color: 'white',
          padding: '10px',
          position: 'fixed',
          bottom: '0',
          width: '100%',
        }}
      >
        <p>&copy; 2025 Research Tool</p>
      </motion.div>
    </div>
  );
};

export default App;
