import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useWeatherContext } from '../context/Wethercotext';

const Theme = () => {
  const { darkMode, toggleDarkMode } = useWeatherContext();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleDarkMode();
    setTimeout(() => setIsAnimating(false), 700);
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        relative p-2.5 rounded-full 
        bg-gradient-to-br ${darkMode ? 
          'from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800' : 
          'from-blue-50 to-yellow-50 hover:from-blue-100 hover:to-yellow-100'
        }
        shadow-lg hover:shadow-xl
        transition-all duration-300 transform hover:scale-105
        border ${darkMode ? 
          'border-gray-700' : 
          'border-gray-200'
        }
        focus:outline-none focus:ring-2 focus:ring-blue-400
        overflow-hidden
      `}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span 
        className={`
          absolute inset-0 rounded-full 
          ${isAnimating ? 'animate-ripple' : 'opacity-0'} 
          ${darkMode ? 'bg-yellow-400/20' : 'bg-blue-600/20'}
        `}
      ></span>
      <span 
        className={`
          absolute inset-0 rounded-full border-2 border-dashed 
          ${darkMode ? 'border-gray-600' : 'border-yellow-200'} 
          opacity-50 animate-spin-slow
        `}
        style={{ animationDuration: '15s' }}
      ></span>
      <span 
        className={`
          relative block transition-transform duration-500
          ${isAnimating ? (darkMode ? 'rotate-180 scale-110' : '-rotate-180 scale-110') : ''}
        `}
      >
        {darkMode ? (
          <Sun className="h-5 w-5 text-yellow-400 transition-all animate-pulse-slow" style={{ animationDuration: '3s' }} />
        ) : (
          <Moon className="h-5 w-5 text-blue-600 transition-all animate-float" style={{ animationDuration: '3s' }} />
        )}
        {darkMode && (
          <span className="absolute top-0 right-0 h-px w-5 bg-yellow-400 opacity-70 -rotate-45 animate-shooting-star"></span>
        )}
        {!darkMode && (
          <span className="absolute top-1 right-1 h-1 w-1 rounded-full bg-blue-800/20"></span>
        )}
      </span>
    </button>
  );
};

export default Theme;
