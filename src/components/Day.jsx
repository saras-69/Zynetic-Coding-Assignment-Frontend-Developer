import React from 'react';
import { Sun, Sunrise, Sunset, Moon, Clock } from 'lucide-react';

const Day = ({ timezone = 0, sunrise, sunset }) => {
  const now = new Date();
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
  const locationTime = new Date(utcTime + (timezone * 1000));
  
  const hours = locationTime.getHours();
  const sunriseTime = new Date(sunrise * 1000);
  const sunsetTime = new Date(sunset * 1000);
  
  const getTimeOfDay = () => {
    // Early morning
    if (hours >= 5 && hours < 8) {
      return {
        name: "Early Morning",
        icon: <Sunrise className="h-5 w-5 text-orange-400" />,
        color: "from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30",
        textColor: "text-orange-700 dark:text-orange-300",
        iconBg: "bg-orange-100 dark:bg-orange-900/30"
      };
    }
    // Morning 
    else if (hours >= 8 && hours < 12) {
      return {
        name: "Morning",
        icon: <Sun className="h-5 w-5 text-yellow-500" />,
        color: "from-yellow-100 to-blue-100 dark:from-yellow-900/30 dark:to-blue-900/30",
        textColor: "text-yellow-700 dark:text-yellow-300", 
        iconBg: "bg-yellow-100 dark:bg-yellow-900/30"
      };
    }
    // Afternoon 
    else if (hours >= 12 && hours < 17) {
      return {
        name: "Afternoon",
        icon: <Sun className="h-5 w-5 text-blue-500" />,
        color: "from-blue-100 to-sky-100 dark:from-blue-900/30 dark:to-sky-900/30",
        textColor: "text-blue-700 dark:text-blue-300",
        iconBg: "bg-blue-100 dark:bg-blue-900/30"
      };
    }
    // Evening 
    else if (hours >= 17 && hours < 20) {
      return {
        name: "Evening",
        icon: <Sunset className="h-5 w-5 text-purple-500" />,
        color: "from-purple-100 to-orange-100 dark:from-purple-900/30 dark:to-orange-900/30",
        textColor: "text-purple-700 dark:text-purple-300",
        iconBg: "bg-purple-100 dark:bg-purple-900/30" 
      };
    }
    // Night 
    else if (hours >= 20 && hours < 24) {
      return {
        name: "Night",
        icon: <Moon className="h-5 w-5 text-indigo-500" />,
        color: "from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30",
        textColor: "text-indigo-700 dark:text-indigo-300",
        iconBg: "bg-indigo-100 dark:bg-indigo-900/30"
      };
    }
    // Midnight
    else {
      return {
        name: "Late Night",
        icon: <Clock className="h-5 w-5 text-gray-500" />,
        color: "from-gray-100 to-indigo-100 dark:from-gray-900/50 dark:to-indigo-900/30",
        textColor: "text-gray-700 dark:text-gray-300",
        iconBg: "bg-gray-100 dark:bg-gray-800/50"
      };
    }
  };

  const timeOfDay = getTimeOfDay();
  const localTime = locationTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <div className={`p-3 bg-gradient-to-r ${timeOfDay.color} rounded-lg shadow-sm backdrop-blur-sm
      border border-white/30 dark:border-gray-700/30 animate-fade-in
      transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md group`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2 ${timeOfDay.iconBg} rounded-full 
            group-hover:scale-110 transition-transform duration-300`}>
            {timeOfDay.icon}
          </div>
          <div>
            <p className={`text-xs font-['Inter'] ${timeOfDay.textColor}`}>Local Time</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white font-['DM_Sans']">
              {localTime}
            </p>
          </div>
        </div>
        <div className={`text-sm font-medium ${timeOfDay.textColor} font-['Playfair_Display']`}>
          {timeOfDay.name}
        </div>
      </div>
    </div>
  );
};

export default Day;