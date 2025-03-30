import React, { useState, useEffect, useRef } from 'react';
import { useWeatherContext } from '../context/Wethercotext';
import { ChevronRight, ChevronLeft, Clock, Thermometer, Droplets, Wind } from 'lucide-react';

const Details = () => {
  const { forecast, weather } = useWeatherContext();
  const [selectedHour, setSelectedHour] = useState(null);
  const scrollContainerRef = useRef(null);
  
  // Reset selection when new forecast data is loaded
  useEffect(() => {
    setSelectedHour(null);
  }, [forecast?.city?.id]);
  
  if (!forecast || !forecast.list || forecast.list.length === 0) {
    return null;
  }

  const hourlyData = forecast.list.slice(0, 24); // Get first 24 hours (8 entries for 3-hour forecasts)

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  const getGradientByTemp = (temp) => {
    if (temp < 0) return 'from-blue-200 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40';
    if (temp < 10) return 'from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40';
    if (temp < 20) return 'from-green-100 to-cyan-100 dark:from-green-900/40 dark:to-cyan-900/40';
    if (temp < 30) return 'from-yellow-100 to-green-100 dark:from-yellow-900/40 dark:to-green-900/40';
    return 'from-orange-100 to-yellow-100 dark:from-orange-900/40 dark:to-yellow-900/40';
  };

  const isNow = (timestamp) => {
    const now = new Date();
    const forecastTime = new Date(timestamp * 1000);
    // Consider it "now" if the forecast time is within ±1.5 hours of current time
    return Math.abs(now - forecastTime) < 5400000; // 1.5 hours in milliseconds
  };

  return (
    <div className="mt-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-['Playfair_Display'] font-bold text-gray-800 dark:text-white">3-Hour Forecast</h3>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleScroll('left')}
            className="p-1.5 rounded-lg bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          
          <button
            onClick={() => handleScroll('right')}
            className="p-1.5 rounded-lg bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      {/* Scrollable container */}
      <div 
        ref={scrollContainerRef} 
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent"
        style={{ 
          scrollbarWidth: 'thin',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {hourlyData.map((hourData, index) => {
          const isSelected = selectedHour === hourData.dt;
          const isCurrentHour = isNow(hourData.dt);
          const tempGradient = getGradientByTemp(hourData.main.temp);
          const isDay = hourData.sys.pod === 'd';
          
          return (
            <div 
              key={hourData.dt}
              onClick={() => setSelectedHour(isSelected ? null : hourData.dt)}
              className={`flex-shrink-0 w-[120px] bg-gradient-to-br ${tempGradient} rounded-xl p-3 cursor-pointer 
                transition-all duration-300 transform border border-white/30 dark:border-gray-700/30
                ${isSelected ? 'scale-105 shadow-lg z-10' : 'hover:scale-102'} 
                ${isCurrentHour ? 'ring-2 ring-blue-400 dark:ring-blue-500 ring-offset-2 ring-offset-white/50 dark:ring-offset-gray-900/50' : ''}`}
            >
              <div className="flex flex-col items-center">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1 font-['DM_Sans']">
                  {formatTime(hourData.dt)}
                </p>
                
                {isCurrentHour && (
                  <span className="text-[10px] bg-blue-500/20 text-blue-700 dark:text-blue-300 px-2 rounded-full mb-1">
                    Now
                  </span>
                )}
                
                <div className="my-1">
                  <img 
                    src={`https://openweathermap.org/img/wn/${hourData.weather[0].icon}.png`} 
                    alt={hourData.weather[0].description}
                    className="w-10 h-10"
                    title={hourData.weather[0].description}
                  />
                </div>
                
                <p className="text-base font-bold text-gray-900 dark:text-white font-['Inter']">
                  {Math.round(hourData.main.temp)}°C
                </p>
              </div>
              
              {isSelected && (
                <div className="mt-3 pt-2 border-t border-gray-200/50 dark:border-gray-700/50 animate-fade-in">
                  <div className="grid grid-cols-1 gap-1.5">
                    <div className="flex items-center">
                      <Droplets className="h-3 w-3 text-blue-500 dark:text-blue-400 mr-1" />
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        {hourData.main.humidity}%
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Wind className="h-3 w-3 text-teal-500 dark:text-teal-400 mr-1" />
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        {hourData.wind.speed}m/s
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Thermometer className="h-3 w-3 text-orange-500 dark:text-orange-400 mr-1" />
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        {Math.round(hourData.main.feels_like)}°C
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-xs italic text-gray-500 dark:text-gray-400 capitalize line-clamp-2">
                        {hourData.weather[0].description}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Custom scrollbar indicator (optional) */}
      <div className="mt-2 h-1 bg-gray-200/50 dark:bg-gray-700/30 rounded-full overflow-hidden">
        <div className="h-full bg-blue-400/30 dark:bg-blue-500/30 rounded-full w-1/3"></div>
      </div>
    </div>
  );
};

export default Details;