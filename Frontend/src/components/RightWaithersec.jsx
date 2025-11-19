import React, { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, MapPin, Search } from "lucide-react";

const RightWaithersec = () => {
  const [location, setLocation] = useState("Dhaka");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "";

  const getWeatherIcon = (description, size = 64) => {
    const desc = (description || "").toLowerCase();
    if (desc.includes("clear") || desc.includes("sunny")) {
      return <Sun size={size} className="text-yellow-400" />;
    } else if (desc.includes("rain")) {
      return <CloudRain size={size} className="text-blue-400" />;
    } else if (desc.includes("cloud")) {
      return <Cloud size={size} className="text-gray-300" />;
    }
    return <Sun size={size} className="text-yellow-400" />;
  };

  const fetchWeather = async (city) => {
    if (!API_KEY) {
      console.warn("VITE_WEATHER_API_KEY is missing. Using demo data.");
      setError("Weather API key not found — showing demo data.");
      setDemoData();
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const resCurrent = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${API_KEY}`
      );

      if (!resCurrent.ok) {
        throw new Error("Location not found");
      }

      const current = await resCurrent.json();

      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${API_KEY}`
      );

      if (!resForecast.ok) {
        // still process current but show notice
        const forecast = null;
        processWeather(current, forecast);
        setError("Forecast not available for this location.");
        return;
      }

      const forecast = await resForecast.json();
      processWeather(current, forecast);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError(String(err.message || err));
      setDemoData();
    } finally {
      setLoading(false);
    }
  };

  const processWeather = (current, forecast) => {
    const today = new Date();

    // hourly — if forecast exists use it, otherwise approximate with current
    const hourlySource = forecast?.list ?? [];
    const hourly = (hourlySource.length
      ? hourlySource.slice(0, 8)
      : [current]
    ).map((item) => ({
      time: new Date(item.dt * 1000).getHours(),
      temp: Math.round(item.main.temp),
    }));

    // daily 5-day from forecast if available
    const daily = [];
    for (let i = 1; i <= 5; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      let match = null;
      if (forecast?.list) {
        match = forecast.list.find((item) => {
          const d = new Date(item.dt * 1000);
          return d.getDate() === date.getDate();
        });
      }

      daily.push({
        day: date.toLocaleDateString("en-US", { weekday: "long" }),
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        temp: match ? Math.round(match.main.temp) : Math.round(current.main.temp),
        description: match?.weather?.[0]?.description || current.weather[0].description,
      });
    }

    setWeatherData({
      current: {
        temp: Math.round(current.main.temp),
        description: current.weather[0].main,
        humidity: current.main.humidity,
        windSpeed: Math.round(current.wind.speed * 2.237), // m/s to mph
        rainPossibility: current.clouds?.all ?? 0,
        icon: current.weather[0].description,
      },
      hourly,
      daily,
      location: current.name,
    });
  };

  const setDemoData = () => {
    setWeatherData({
      current: {
        temp: 25,
        description: "Mostly Sunny",
        humidity: 88,
        windSpeed: 2,
        rainPossibility: 17,
        icon: "sunny",
      },
      hourly: [
        { time: 12, temp: 26 },
        { time: 16, temp: 29 },
        { time: 20, temp: 31 },
        { time: 22, temp: 28 },
        { time: 0, temp: 24 },
        { time: 4, temp: 18 },
        { time: 6, temp: 18 },
      ],
      daily: [
        { day: "Sunday", date: "Dec-07, 2025", temp: 27, description: "Sunny" },
        { day: "Monday", date: "Dec-08, 2025", temp: 28, description: "Sunny" },
        { day: "Tuesday", date: "Dec-09, 2025", temp: 22, description: "Cloudy" },
        { day: "Wednesday", date: "Dec-10, 2025", temp: 26, description: "Partly Cloudy" },
        { day: "Thursday", date: "Dec-11, 2025", temp: 18, description: "Rainy" },
      ],
      location,
    });
  };

  useEffect(() => {
    if (location) fetchWeather(location);
   
  }, [location]);

  const handleSearch = () => {
    if (inputValue.trim()) {
      setLocation(inputValue.trim());
      setInputValue("");
    }
  };

  const today = new Date();
  const todayDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const todayTime = today.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  if (loading || !weatherData)
    return <div className="p-6 text-center">Loading...</div>;

  return (
    <div
      className="
        bg-white 
        rounded-3xl 
        shadow-xl 
        p-4 sm:p-6 
        w-full 
        max-w-[1150px]
        mx-auto 
        flex 
        flex-col 
        lg:flex-row 
        gap-6 lg:gap-10
      "
    >
      {/* show non-blocking error */}
      {error && (
        <div className="w-full bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded mb-2 text-sm text-yellow-800">
          {error}
        </div>
      )}

      {/* LEFT PANEL */}
      <div className="flex-1">
        <h3 className="text-sm text-gray-600">Today</h3>
        <p className="text-xs text-gray-500">
          {todayDate}, {todayTime}
        </p>

        <div className="mt-4 flex items-center gap-4">
          <div className="bg-yellow-100 p-4 rounded-2xl">
            {getWeatherIcon(weatherData.current.icon)}
          </div>

          <div>
            <p className="text-4xl sm:text-5xl font-bold text-gray-800">
              {weatherData.current.temp}°C
            </p>
            <p className="text-gray-600 text-lg sm:text-xl">
              {weatherData.current.description}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-xs text-gray-500">Humidity</p>
            <p className="text-lg font-semibold">
              {weatherData.current.humidity}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Wind</p>
            <p className="text-lg font-semibold">
              {weatherData.current.windSpeed} mph
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Rain</p>
            <p className="text-lg font-semibold">
              {weatherData.current.rainPossibility}%
            </p>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Select Land Location"
              className="w-full border rounded-xl px-4 py-2 pr-10"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <MapPin
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          <button
            onClick={handleSearch}
            className="bg-green-800 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2"
          >
            <Search size={18} /> Search
          </button>
        </div>
      </div>

      {/* RIGHT FORECAST PANEL */}
      <div
        className="
          w-full 
          lg:w-[35%]
          pt-6 lg:pt-0 
          border-t lg:border-t-0 
          lg:border-l 
          pl-0 lg:pl-6 
          space-y-4
        "
      >
        <h4 className="text-lg font-semibold text-gray-800">5-Day Forecast</h4>

        {weatherData.daily.map((d, i) => (
          <div key={i} className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">{d.date}</p>
              <p className="text-xl font-semibold text-green-900">{d.day}</p>
            </div>

            <div className="flex items-center gap-2">
              {getWeatherIcon(d.description, 20)}
              <p className="text-xl font-bold text-green-900">{d.temp}°C</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightWaithersec;
