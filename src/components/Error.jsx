import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const Error = ({ message, onDismiss }) => {
  return (
    <div 
      className="relative overflow-hidden bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 
      border-l-4 border-red-500 dark:border-red-400 rounded-lg shadow-lg animate-fade-in transform transition-all 
      hover:shadow-xl max-w-md w-full"
      role="alert"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-red-300/10 rounded-full -mr-8 -mt-8 blur-2xl"></div>
      
      <div className="px-4 py-3 sm:px-5 sm:py-4 relative z-10">
        <div className="flex items-start">
          <div className="flex-shrink-0 animate-bounce-soft" style={{ animationDuration: '3s' }}>
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
          </div>
          
          <div className="ml-3 w-0 flex-1">
            <div className="font-['Playfair_Display'] font-bold text-base text-red-700 dark:text-red-400 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Error 
            </div>
            <p className="mt-1 font-['DM_Sans'] text-sm text-red-600 dark:text-red-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {message || "Something went wrong. Please try again."}
            </p>
            
            <div className="mt-3 flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <button 
                className="inline-flex bg-white dark:bg-gray-800 px-3 py-1.5 rounded-md text-sm font-medium 
                  text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 
                  transition-colors duration-200 transform hover:scale-105 shadow-sm"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
              
            </div>
          </div>
          
          {onDismiss && (
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="bg-red-100 dark:bg-red-900/30 rounded-md p-1.5 
                  text-red-500 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 
                  transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={onDismiss}
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 h-1 bg-red-500/30 w-full">
        <div className="h-full bg-red-500 animate-shrink" style={{ animationDuration: '10s' }}></div>
      </div>
    </div>
  );
};


export default Error;