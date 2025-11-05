import { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Clouds from "../assets/Frame 32.svg";
import Thunderstorm from "../assets/Frame 34.svg";
import Clear from "../assets/Frame 34(1).svg";
import PartlyCloudy from "../assets/image 7.svg";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ColorModeContext } from "../context/ColorModeContext";

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
  const { t, i18n } = useTranslation();
  const { darkMode } = useContext(ColorModeContext);
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const cityNamesFa: Record<string, string> = {
    Tehran: "تهران",
  };

  const weatherTranslations: Record<string, string> = {
    Clear: "صاف",
    Clouds: "ابری",
    Rain: "بارانی",
    Snow: "برفی",
    Thunderstorm: "رعد و برق",
    Drizzle: "نم‌نم باران",
    Mist: "مه‌آلود",
    Haze: "غبارآلود",
    Fog: "مه",
    Dust: "گرد و غبار",
    Smoke: "دودآلود",
  };

  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric&lang=${
            i18n.language === "fa" ? "fa" : "en"
          }`
        );
        const data = await response.json();
        if (data.cod === 200) setWeatherData(data);
        else setWeatherData(null);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity, API_KEY, i18n.language]);

  if (loading)
    return <div className="text-center text-gray-500 py-4">Loading...</div>;
  if (!weatherData)
    return (
      <div className="text-center text-gray-500 py-4">
        No data available for "{selectedCity}"
      </div>
    );

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

    const hours = localTime.getHours();
    let period = "";

    if (i18n.language === "fa") {
      if (hours < 12) period = "صبح";
      else if (hours < 17) period = "ظهر";
      else if (hours < 20) period = "عصر";
      else period = "شب";
    } else {
      period = hours < 12 ? "AM" : "PM";
    }

    const formattedDay = localTime.toLocaleDateString(
      i18n.language === "fa" ? "fa-IR" : "en-US",
      { weekday: "long" }
    );
    const formattedDate = localTime.toLocaleDateString(
      i18n.language === "fa" ? "fa-IR" : "en-US",
      { day: "numeric", month: "long", year: "numeric" }
    );
    const formattedTime = localTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return { formattedDate, formattedTime, formattedDay, period };
  };

  const { formattedDate, formattedTime, formattedDay, period } = getLocalTime(
    weatherData.timezone
  );

  const cityName =
    i18n.language === "fa" && cityNamesFa[weatherData.name]
      ? cityNamesFa[weatherData.name]
      : weatherData.name;

  const weatherMain =
    i18n.language === "fa"
      ? weatherTranslations[weatherData.weather[0].main] ||
        weatherData.weather[0].main
      : weatherData.weather[0].main;

  return (
    <div
      dir={i18n.language === "fa" ? "rtl" : "ltr"}
      className={`rounded-3xl px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[0_4px_10px_rgba(0,0,0,0.15)] ${
        darkMode
          ? "bg-[#292F45] text-[#F3F4F7]  "
          : "light-gray-blue text-[#003464]  "
      } ${i18n.language === "fa" ? "text-right" : "text-left"}`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 bg-gray-blue px-3 py-3 w-fit rounded-[50px] mx-auto sm:mx-0">
          <LocationOnIcon
            className={` ${darkMode ? "text-[#3D4852]  " : " "} `}
          />
          <h2 className="gray-dark-2">{cityName}</h2>
        </div>

        <div className="flex flex-col gap-3 text-center sm:text-start">
          <div>
            <p className="font-medium text-[32px]">{formattedDay}</p>
            <p className="text-sm flex justify-center sm:justify-start items-center gap-2">
              {formattedDate}{" "}
              <span>
                {formattedTime} {i18n.language === "fa" && period}
              </span>
            </p>
          </div>

          <div>
            <h3 className="font-medium text-[32px]">
              {Math.round(weatherData.main.temp)}°C
            </h3>
            <p className="text-sm">
              {i18n.language === "fa"
                ? `بیشینه: ${Math.round(
                    weatherData.main.temp_max
                  )}°  کمینه: ${Math.round(weatherData.main.temp_min)}°`
                : `High: ${Math.round(
                    weatherData.main.temp_max
                  )}°  Low: ${Math.round(weatherData.main.temp_min)}°`}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center">
          {getWeatherIcon(
            weatherData.weather[0].main,
            weatherData.weather[0].description
          )}
        </div>
        <div>
          <p className="text-[32px]">{weatherMain}</p>
          <p>
            {i18n.language === "fa"
              ? `${Math.round(weatherData.main.feels_like)}° ${t("FeelsLike")}`
              : `${t("FeelsLike")} ${Math.round(weatherData.main.feels_like)}°`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
