import React, { useState, useEffect } from 'react';
import { useWeatherContext } from '../context/Wethercotext';
import { Droplets, Wind, CloudRain, Gauge, X } from 'lucide-react';

const Details = ({ forecastItem, onClose }) => {
  useEffect(() => {
    console.log("Details rendering with item:", forecastItem);
  }, [forecastItem]);
  
  const { weather, airQuality } = useWeatherContext();
  
  if (!forecastItem) {
    console.error("Details: Missing required forecastItem prop");
    return (
      <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-xl shadow-lg p-5 border border-red-200 dark:border-red-800/40 backdrop-blur-sm animate-fade-in">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="p-3 bg-red-100 dark:bg-red-800/30 rounded-full animate-pulse-slow">
            <X className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-red-600 dark:text-red-400 font-['DM_Sans'] text-center font-medium">Weather data is not available</p>
          {onClose && (
            <button 
              onClick={onClose} 
              className="mt-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:scale-105"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  const getAqiInfo = (aqi) => {
    const info = [
      { label: 'Good', color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-900/30' },
      { label: 'Fair', color: 'text-yellow-400', bgColor: 'bg-yellow-50 dark:bg-yellow-900/30' },
      { label: 'Moderate', color: 'text-yellow-600', bgColor: 'bg-yellow-50 dark:bg-yellow-900/30' },
      { label: 'Poor', color: 'text-red-500', bgColor: 'bg-red-50 dark:bg-red-900/30' },
      { label: 'Very Poor', color: 'text-purple-700', bgColor: 'bg-purple-50 dark:bg-purple-900/30' }
    ];
    return aqi && aqi >= 1 && aqi <= 5 ? info[aqi - 1] : { label: 'Unknown', color: 'text-gray-400', bgColor: 'bg-gray-50 dark:bg-gray-800/30' };
  };
  
  const getPrecipitation = (forecastItem) => {
    if (!forecastItem) return '0 mm';
    if (forecastItem.rain && forecastItem.rain['3h']) return `${forecastItem.rain['3h']} mm`;
    if (forecastItem.snow && forecastItem.snow['3h']) return `${forecastItem.snow['3h']} mm (snow)`;
    return '0 mm';
  };

  const isToday = () => {
    try {
      const forecastDate = new Date(forecastItem.dt * 1000);
      const today = new Date();
      return forecastDate.getDate() === today.getDate() &&
             forecastDate.getMonth() === today.getMonth() &&
             forecastDate.getFullYear() === today.getFullYear();
    } catch (error) {
      console.error("Error checking if date is today:", error);
      return false;
    }
  };

  const aqiValue = airQuality?.list?.[0]?.main?.aqi || 0;
  const aqiInfo = getAqiInfo(aqiValue);

  const isDay = forecastItem.weather?.[0]?.icon?.includes('d') || false;

  if (!forecastItem.main || !forecastItem.weather || !forecastItem.weather[0]) {
    console.error("Details: Invalid forecastItem structure", forecastItem);
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border-l-4 border-red-500 text-center animate-fade-in">
        <p className="text-red-500 font-['DM_Sans']">Error: Incomplete weather data</p>
        {onClose && (
          <button onClick={onClose} className="mt-2 text-gray-500 hover:text-gray-700 transition-colors">
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`${
      isDay 
        ? 'bg-gradient-to-br from-blue-50 to-sky-100 dark:from-blue-900/40 dark:to-sky-900/40' 
        : 'bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40'
    } rounded-xl shadow-lg border border-white/50 dark:border-gray-700/30 backdrop-blur-sm transition-all
    transform hover:shadow-xl p-5 animate-fade-in h-full overflow-hidden relative`}>
      
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-300/10 dark:bg-blue-400/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-300/10 dark:bg-purple-400/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>
     
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h4 className="font-['Playfair_Display'] font-bold text-xl text-gray-900 dark:text-white tracking-tight">
            {new Date(forecastItem.dt * 1000).toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'short', 
              day: 'numeric' 
            })}
            {isToday() && (
              <span className="ml-2 text-sm font-['Inter'] font-medium text-blue-500 bg-blue-100/50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full animate-pulse-slow">
                Today
              </span>
            )}
          </h4>
          <p className="text-gray-600 dark:text-gray-300 capitalize font-['DM_Sans'] mt-1">
            {forecastItem.weather[0].description}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="animate-bounce-soft" style={{ animationDuration: '3s' }}>
            <img 
              src={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`} 
              alt={forecastItem.weather[0].description} 
              className="w-16 h-16 drop-shadow-md"
            />
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 bg-white/30 dark:bg-gray-700/30 rounded-full text-gray-500 dark:text-gray-400 
              hover:bg-white/60 dark:hover:bg-gray-700/60 hover:text-gray-700 dark:hover:text-white 
              transition-all duration-200 transform hover:scale-110"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      {/* Temperature section */}
      <div className="mb-6 flex items-end animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="text-4xl font-bold font-['Inter'] text-gray-900 dark:text-white tracking-tighter">
          {Math.round(forecastItem.main.temp)}
        </div>
        <div className="text-xl font-light text-gray-700 dark:text-gray-300 ml-1 mb-1">°C</div>
        <div className="ml-3 text-sm text-gray-600 dark:text-gray-400 mb-1.5 font-['DM_Sans']">
          Feels like {Math.round(forecastItem.main.feels_like)}°C
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-lg p-3 
          hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 group">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100/80 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 
              dark:group-hover:bg-blue-800/50 transition-colors duration-300">
              <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-3 font-['DM_Sans']">
              <p className="text-xs text-gray-500 dark:text-gray-400">Humidity</p>
              <p className="text-base font-semibold text-gray-800 dark:text-white">{forecastItem.main.humidity}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-lg p-3 
          hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 group">
          <div className="flex items-center">
            <div className="p-2 bg-teal-100/80 dark:bg-teal-900/30 rounded-lg group-hover:bg-teal-200 
              dark:group-hover:bg-teal-800/50 transition-colors duration-300">
              <Wind className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            </div>
            <div className="ml-3 font-['DM_Sans']">
              <p className="text-xs text-gray-500 dark:text-gray-400">Wind Speed</p>
              <p className="text-base font-semibold text-gray-800 dark:text-white">{forecastItem.wind.speed} m/s</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-lg p-3 
          hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 group">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100/80 dark:bg-indigo-900/30 rounded-lg group-hover:bg-indigo-200 
              dark:group-hover:bg-indigo-800/50 transition-colors duration-300">
              <CloudRain className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="ml-3 font-['DM_Sans']">
              <p className="text-xs text-gray-500 dark:text-gray-400">Precipitation</p>
              <p className="text-base font-semibold text-gray-800 dark:text-white">{getPrecipitation(forecastItem)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-lg p-3 
          hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 group">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100/80 dark:bg-amber-900/30 rounded-lg group-hover:bg-amber-200 
              dark:group-hover:bg-amber-800/50 transition-colors duration-300">
              <Gauge className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="ml-3 font-['DM_Sans']">
              <p className="text-xs text-gray-500 dark:text-gray-400">Pressure</p>
              <p className="text-base font-semibold text-gray-800 dark:text-white">{forecastItem.main.pressure} hPa</p>
            </div>
          </div>
        </div>
      </div>
      
      {aqiValue > 0 && (
        <div className="mt-5 bg-white/50 dark:bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 border-l-4 border-l-blue-400 
          dark:border-l-blue-500 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-md ${aqiInfo.bgColor}`}>
                <svg className={`h-4 w-4 ${aqiInfo.color}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9a1 1 0 011-1h4a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 111.414 1.414L9.414 7H12a3 3 0 110 6h-2a1 1 0 110-2h2a1 1 0 000-2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-['Inter'] font-medium">Air Quality</span>
            </div>
            <span className={`font-semibold ${aqiInfo.color} px-2.5 py-0.5 rounded-full text-xs ${aqiInfo.bgColor}`}>
              {aqiInfo.label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;