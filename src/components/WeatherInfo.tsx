import { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Clouds from "../assets/Frame 32.svg";
import Thunderstorm from "../assets/Frame 34.svg";
import Clear from "../assets/Frame 34(1).svg";
import PartlyCloudy from "../assets/image 7.svg";

interface WeatherMain {
  temp: number;
  temp_min: number;
  temp_max: number;
  feels_like: number;
  humidity: number;
  pressure: number;
}

interface Weather {
  name: string;
  timezone: number;
  weather: { main: string; description: string }[];
  main: WeatherMain;
}

interface WeatherInfoProps {
  selectedCity: string;
}

const WeatherInfo = ({ selectedCity }: WeatherInfoProps) => {
  const [weatherData, setWeatherData] = useState<Weather | null>(null);

  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        console.log("API DATA:", data);
        if (data.cod === 200) {
          setWeatherData(data);
        } else {
          setWeatherData(null);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity, API_KEY]);

  if (loading) {
    return <div className="text-center text-gray-500 py-4">Loading...</div>;
  }

  if (!weatherData) {
    return (
      <div className="text-center text-gray-500 py-4">
        No data available for "{selectedCity}"
      </div>
    );
  }

  const getWeatherIcon = (main: string, description: string) => {
    if (main === "Clear") return <img src={Clear} alt="Clear" />;
    if (main === "Clouds" && description.toLowerCase().includes("few clouds"))
      return <img src={PartlyCloudy} alt="Partly Cloudy" />;
    if (main === "Clouds") return <img src={Clouds} alt="Clouds" />;
    if (main === "Thunderstorm")
      return <img src={Thunderstorm} alt="Thunderstorm" />;
    return <img src={Clear} alt="Clear" />;
  };

  const getLocalTime = (timezone: number) => {
    const nowUTC = new Date(
      Date.now() + new Date().getTimezoneOffset() * 60000
    );
    const localTime = new Date(nowUTC.getTime() + timezone * 1000);
    const formattedDay = localTime.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const formattedDate = localTime.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const formattedTime = localTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { formattedDate, formattedTime, formattedDay };
  };

  const { formattedDate, formattedTime, formattedDay } = getLocalTime(
    weatherData.timezone
  );

  return (
    <div className="light-gray-blue rounded-3xl px-5 py-6 flex gap-34 shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 bg-gray-blue px-2.5 py-4 w-fit rounded-[50px]">
          <LocationOnIcon />
          <h2 className="gray-dark-2 ">{weatherData.name}</h2>
        </div>
        <div className="flex flex-col items-start gap-4">
          <div>
            <p className="font-medium text-[32px]">{formattedDay}</p>
            <p className="text-sm">
              {formattedDate} <span className="ml-5">{formattedTime}</span>
            </p>
          </div>
          <div>
            <h3 className="font-medium text-[32px]">
              {Math.round(weatherData.main.temp)}°C
            </h3>
            <p className="text-sm">
              High: {Math.round(weatherData.main.temp_max)}° Low:{" "}
              {Math.round(weatherData.main.temp_min)}°
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-evenly">
        <div className="flex items-center gap-2 ">
          {getWeatherIcon(
            weatherData.weather[0].main,
            weatherData.weather[0].description
          )}
        </div>
        <div>
          <p className="text-[32px]">{weatherData.weather[0].main}</p>
          <p>Feels Like {Math.round(weatherData.main.feels_like)}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
