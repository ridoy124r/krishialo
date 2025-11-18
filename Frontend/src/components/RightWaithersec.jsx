import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, MapPin, Search } from 'lucide-react';

const RightWaithersec = () => {
  const [location, setLocation] = useState('Dhaka');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');

  // --- Utility Functions (Unchanged) ---
  const getWeatherIcon = (description, size = 64) => {
    const desc = description?.toLowerCase() || '';
    if (desc.includes('clear') || desc.includes('sunny')) {
      return <Sun size={size} className="text-yellow-400" />;
    } else if (desc.includes('rain')) {
      return <CloudRain size={size} className="text-blue-400" />;
    } else if (desc.includes('cloud')) {
      return <Cloud size={size} className="text-gray-300" />;
    }
    return <Sun size={size} className="text-yellow-400" />;
  };

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      const OPENWEATHER_KEY = 'a0025db8f29f3c7f498b58f80e9b9881'; // Using the key provided by the user

      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_KEY}`
      );

      if (!currentResponse.ok) throw new Error('Location not found');
      const currentData = await currentResponse.json();

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${OPENWEATHER_KEY}`
      );
      const forecastData = await forecastResponse.json();

      processWeather(currentData, forecastData);
    } catch (err) {
      console.error(err);
      setDemoData();
    } finally {
      setLoading(false);
    }
  };

  const processWeather = (current, forecast) => {
    const today = new Date();
    const hourly = forecast.list.slice(0, 8).map(item => ({
      time: new Date(item.dt * 1000).getHours(),
      temp: Math.round(item.main.temp)
    }));

    const daily = [];
    for (let i = 1; i <= 5; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      const matched = forecast.list.find(item => {
        const d = new Date(item.dt * 1000);
        return d.getDate() === date.getDate();
      });

      daily.push({
        day: date.toLocaleDateString('en-US', { weekday: 'long' }),
        date: date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        temp: matched ? Math.round(matched.main.temp) : Math.round(current.main.temp - i),
        description: matched?.weather[0]?.description || current.weather[0].description
      });
    }

    setWeatherData({
      current: {
        temp: Math.round(current.main.temp),
        description: current.weather[0].main,
        humidity: current.main.humidity,
        windSpeed: Math.round(current.wind.speed * 2.237),
        rainPossibility: current.clouds.all,
        icon: current.weather[0].description
      },
      hourly,
      daily,
      location: current.name
    });
  };

  const setDemoData = () => {
    setWeatherData({
      current: {
        temp: 25,
        description: 'Mostly Sunny',
        humidity: 88,
        windSpeed: 2,
        rainPossibility: 17,
        icon: 'sunny'
      },
      hourly: [
        { time: 12, temp: 26 },
        { time: 16, temp: 29 },
        { time: 20, temp: 31 },
        { time: 22, temp: 28 },
        { time: 0, temp: 24 },
        { time: 4, temp: 18 },
        { time: 6, temp: 18 }
      ],
      daily: [
        { day: 'Sunday', date: 'Dec-07, 2025', temp: 27, description: 'Sunny' },
        { day: 'Monday', date: 'Dec-08, 2025', temp: 28, description: 'Sunny' },
        { day: 'Tuesday', date: 'Dec-09, 2025', temp: 22, description: 'Cloudy' },
        { day: 'Wed. day', date: 'Dec-10, 2025', temp: 26, description: 'Partly Cloudy' },
        { day: 'Thursday', date: 'Dec-11, 2025', temp: 18, description: 'Rainy' }
      ],
      location
    });
  };

  useEffect(() => {
    // FIX: Removed the redundant API key check. Now it simply tries to fetch weather 
    // for the current location every time 'location' changes.
    if (location) {
      fetchWeather(location);
    }
    // We rely on fetchWeather's try/catch block to fall back to setDemoData if the API fails.
  }, [location]);

  const handleSearch = () => {
    if (inputValue.trim()) {
      setLocation(inputValue.trim());
      setInputValue('');
    }
  };
  // --- End Utility Functions ---

  const today = new Date();
  const todayDate = today.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  const todayTime = today.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

  if (loading || !weatherData) return (<div className="p-6 text-center">Loading...</div>);

  return (
    // Responsive classes are maintained as previously fixed
    <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-6 md:gap-10">
      
      {/* Left Panel - Today's Summary & Search */}
      <div className="flex-1">
        <h3 className="text-sm text-gray-600">Today</h3>
        <p className="text-xs text-gray-500">{todayDate}, {todayTime}</p>

        <div className="mt-4 flex items-center gap-4">
          <div className="bg-yellow-100 p-4 rounded-2xl shrink-0">
            {getWeatherIcon(weatherData.current.icon)}
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-bold text-gray-800">{weatherData.current.temp}°C</p>
            <p className="text-gray-600 text-lg sm:text-xl">{weatherData.current.description}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs text-gray-500">Humidity</p>
            <p className="text-lg font-semibold">{weatherData.current.humidity}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Wind</p>
            <p className="text-lg font-semibold">{weatherData.current.windSpeed} mph</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Rain</p>
            <p className="text-lg font-semibold">{weatherData.current.rainPossibility}%</p>
          </div>
        </div>

        {/* Search - Uses flex-col on small screens, flex-row on larger to save space */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Select Land Location"
              className="w-full border rounded-xl px-4 py-2 pr-10"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <MapPin size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button 
            onClick={handleSearch}
            className="bg-green-800 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2 shrink-0"
          >
            <Search size={18} /> Search
          </button>
        </div>
      </div>

      
      <div className="w-full md:w-1/3 pt-6 md:pt-0 border-t md:border-t-0 md:border-l pl-0 md:pl-6 space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">5-Day Forecast</h4>
        {weatherData.daily.map((d, i) => (
          <div key={i} className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">{d.date}</p>
              <p className="text-xl font-semibold text-green-900">{d.day}</p>
            </div>
            <div className='flex items-center gap-2'>
              {getWeatherIcon(d.description, 20)} 
              <p className="text-xl sm:text-2xl font-bold text-green-900">{d.temp}°C</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightWaithersec;