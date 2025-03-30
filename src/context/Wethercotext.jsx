import React, { createContext, useContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true' || 
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // localStorage searchHistory 
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);
  
  // Toggle 
  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  // Add city to search history
  const addToHistory = (city) => {
    setSearchHistory(prev => {
      // Remove the city if it already exists to avoid duplicates
      const filtered = prev.filter(c => c.toLowerCase() !== city.toLowerCase());
      // Add the city at the beginning and limit to 5 cities
      return [city, ...filtered].slice(0, 5);
    });
  };
  
  // Remove city from search history
  const removeFromHistory = (city) => {
    setSearchHistory(prev => prev.filter(c => c !== city));
  };

  // Get weather data for a city
  const getWeather = async (city) => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    
    try {
      //current weather data
      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`);
      
      if (!weatherRes.ok) {
        throw new Error('City not found or weather data unavailable');
      }
      
      const weatherData = await weatherRes.json();
      setWeather(weatherData);
      
      // search history
      addToHistory(city);
      
      //5-day forecast data
      const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`);
      
      if (!forecastRes.ok) {
        throw new Error('Forecast data unavailable');
      }
      
      const forecastData = await forecastRes.json();
      setForecast(forecastData);
      
      //air quality data if coordinates are available
      if (weatherData.coord) {
        const { lat, lon } = weatherData.coord;
        const airQualityRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`);
        
        if (airQualityRes.ok) {
          const airQualityData = await airQualityRes.json();
          setAirQuality(airQualityData);
        }
      }
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <WeatherContext.Provider value={{
      weather,
      forecast,
      airQuality,
      loading,
      error,
      darkMode,
      toggleDarkMode,
      getWeather,
      searchHistory,
      removeFromHistory
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => useContext(WeatherContext);