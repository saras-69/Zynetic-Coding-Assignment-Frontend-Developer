import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center p-8 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-blue-300/30 dark:border-blue-500/30 
          animate-spin" style={{ animationDuration: '3s' }}></div>
        <div className="absolute inset-1 rounded-full border-r-2 border-l-2 border-purple-300/40 dark:border-purple-500/40 
          animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
        
        <div className="h-16 w-16 rounded-full border-b-2 border-t-2 border-blue-500 dark:border-blue-400 
          animate-spin" style={{ animationDuration: '1.5s' }}></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-300 dark:to-purple-400 
            rounded-full animate-pulse-slow"></div>
        </div>
      </div>
      <div className="mt-6 font-['DM_Sans'] text-gray-600 dark:text-gray-300 relative overflow-hidden">
        <div className="relative z-10 flex items-center">
          <span className="animate-pulse-slow mr-2">Loading</span>
          <span className="flex space-x-1">
            <span className="h-1.5 w-1.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce" 
              style={{ animationDelay: '0ms', animationDuration: '1s' }}></span>
            <span className="h-1.5 w-1.5 bg-purple-500 dark:bg-purple-400 rounded-full animate-bounce" 
              style={{ animationDelay: '200ms', animationDuration: '1s' }}></span>
            <span className="h-1.5 w-1.5 bg-sky-500 dark:bg-sky-400 rounded-full animate-bounce" 
              style={{ animationDelay: '400ms', animationDuration: '1s' }}></span>
          </span>
        </div>
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-blue-500 dark:via-blue-400 to-transparent 
          opacity-70 animate-shimmer"></div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-300/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-300/10 dark:bg-purple-500/10 rounded-full blur-2xl animate-float" 
          style={{ animationDelay: '1s' }}></div>
      </div>
      <p className="mt-8 text-xs font-['Inter'] text-gray-400 dark:text-gray-500 italic max-w-xs text-center animate-fade-in"
        style={{ animationDelay: '1s' }}>
        We're fetching the latest weather data for you. This should only take a moment...
      </p>
    </div>
  );
};

export default Loading;