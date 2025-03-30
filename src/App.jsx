import React, { useEffect } from 'react';
import { WeatherProvider } from './context/Wethercotext';
import Search from './components/Search';
import Card from './components/Card';
import SearchHistory from './components/SearchHistory';
import Forecast from './components/Forecast';
import Theme from './components/Theme';
import Loading from './components/Loading';
import Error from './components/Error';
import { useWeatherContext } from './context/Wethercotext';
import './App.css';

function App() {
  useEffect(() => {

    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&display=swap',
      'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap'
    ];
    
    const linkElements = fontLinks.map(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      return link;
    });
    
    linkElements.forEach(link => document.head.appendChild(link));
    
    return () => {
      linkElements.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  return (
    <WeatherProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500 font-['Inter'] bg-pattern">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-400 opacity-10 blur-[120px] rounded-full dark:bg-blue-600 dark:opacity-20 animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-purple-400 opacity-10 blur-[100px] rounded-full dark:bg-purple-600 dark:opacity-15 animate-float"></div>
        
        <div className="relative flex flex-col items-center py-12 px-4 min-h-screen">
          <div className="w-full max-w-6xl z-10 backdrop-blur-sm">
            {/* Header */}
            <div className="flex justify-between items-center gap-12 mb-10 p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl backdrop-blur-md shadow-lg border border-white/30 dark:border-gray-700/30 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl font-['Playfair_Display'] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 drop-shadow-md hover:scale-105 transition-transform tracking-tight leading-none">
                Weather <span className="font-light opacity-90">Dashboard</span>
              </h1>
              <div className="animate-bounce-subtle">
                <Theme />
              </div>
            </div>
            
            {/* Search */}
            <div className="mb-8 transform hover:-translate-y-1 transition-transform">
              <div className="p-4 bg-white/40 dark:bg-gray-800/40 rounded-xl backdrop-blur-md shadow-md border border-white/30 dark:border-gray-700/30 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <Search />
                <div className="mt-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <SearchHistory />
                </div>
              </div>
            </div>
            
            <DynamicContent />
          </div>
        </div>
      </div>
    </WeatherProvider>
  );
}

const DynamicContent = () => {
  const { weather, forecast, loading, error } = useWeatherContext();

  if (loading) {
    return (
      <div className="p-6 bg-white/30 dark:bg-gray-800/30 rounded-xl backdrop-blur-md shadow-lg border border-white/30 dark:border-gray-700/30 animate-fade-in">
        <Loading />
      </div>
    );
  }
  
  //error
  if (error) {
    return (
      <div className="p-6 bg-white/30 dark:bg-gray-800/30 rounded-xl backdrop-blur-md shadow-lg border border-white/30 dark:border-gray-700/30 animate-fade-in">
        <Error message={error} onDismiss={() => {}} />
      </div>
    );
  }
  
  if (!weather || !forecast) {
    return (
      <div className="p-8 bg-white/40 dark:bg-gray-800/40 rounded-xl backdrop-blur-md shadow-lg border border-white/30 dark:border-gray-700/30 animate-fade-in text-center">
        <h2 className="text-2xl font-['Playfair_Display'] font-bold text-gray-800 dark:text-white mb-4">
          Welcome to Weather Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-300 font-['DM_Sans'] max-w-lg mx-auto">
          Search for a city above to see current weather conditions and the 5-day forecast.
        </p>
        <div className="mt-8 text-blue-500 dark:text-blue-400 animate-bounce-soft">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 transform perspective-1000 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="hover:scale-[1.02] hover:rotate-1 transition-transform duration-300 h-full">
          <Card />
        </div>
      </div>
      
      <div className="lg:col-span-7 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="h-full p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl backdrop-blur-md shadow-lg border border-white/30 dark:border-gray-700/30 hover:shadow-xl transition-shadow duration-300">
          <Forecast key={forecast.city.id} /> 
        </div>
      </div>
    </div>
  );
};

export default App;