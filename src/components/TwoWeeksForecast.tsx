import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import Clouds from "../assets/Frame 32.svg";
import Thunderstorm from "../assets/Frame 34.svg";
import Clear from "../assets/Frame 34(1).svg";
import PartlyCloudy from "../assets/image 7.svg";

interface ForecastDay {
  date: string;
  temp: number;
  icon: string;
  main: string;
  description: string;
}

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const TwoWeeksForecast = ({ city }: { city: string }) => {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [error, setError] = useState<string>("");
  const { t, i18n } = useTranslation();

  const isFarsi = i18n.language === "fa";

  const daysFa = [
    "یک‌شنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
    "شنبه",
  ];

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setError("");

        const geoRes = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );

        if (!geoRes.data.length) {
          setError(t("cityNotFound"));
          return;
        }

        const { lat, lon } = geoRes.data[0];

        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        const dailyData = forecastRes.data.list.filter(
          (_: any, index: number) => index % 8 === 0
        );

        const formattedData: ForecastDay[] = dailyData
          .slice(0, 5)
          .map((item: any, i: number) => {
            const date = new Date(item.dt * 1000);

            let dayName;
            if (i === 0) {
              dayName = isFarsi ? "امروز" : t("today");
            } else {
              dayName = isFarsi
                ? daysFa[date.getDay()]
                : date.toLocaleDateString("en-US", { weekday: "short" });
            }

            return {
              date: dayName,
              temp: Math.round(item.main.temp),
              icon: item.weather[0].icon,
              main: item.weather[0].main,
              description: item.weather[0].description,
            };
          });

        const fakeDays: ForecastDay[] = Array.from({ length: 9 }).map(
          (_, i) => ({
            date: isFarsi ? `روز ${i + 6}` : `Day ${i + 6}`,
            temp: 20 + i,
            icon: "01d",
            main: "Clear",
            description: "clear sky",
          })
        );

        setForecast([...formattedData, ...fakeDays]);
      } catch (err) {
        console.error(err);
        setError(t("failedToFetch"));
      }
    };

    fetchForecast();
  }, [city, i18n.language]);

  const getWeatherIcon = (main: string, description: string) => {
    const desc = description.toLowerCase();
    if (main === "Thunderstorm") return Thunderstorm;
    if (main === "Clear") return Clear;
    if (main === "Clouds") {
      if (desc.includes("few") || desc.includes("scattered"))
        return PartlyCloudy;
      return Clouds;
    }
    if (main === "Rain" || main === "Drizzle") return Clouds;
    if (main === "Snow") return Clouds;
    return Clear;
  };

  return (
    <div
      className={`light-gray-blue rounded-3xl px-5 py-6 mt-4 ${
        isFarsi ? "rtl" : "ltr"
      }`}
      dir={isFarsi ? "rtl" : "ltr"}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: "#1B2767",
          fontSize: "18px",
          mb: 2,
          textAlign: isFarsi ? "right" : "left",
        }}
      >
        {t("twoWeeksForecast")}
      </Typography>

      {error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <div
          dir={isFarsi ? "ltr" : ""}
          className={`
    flex gap-4 
    overflow-x-auto overflow-y-hidden 
    flex-nowrap 
    pb-2
    ${isFarsi ? "flex-row-reverse " : ""}
  `}
        >
          {forecast.map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between gap-7 px-4 py-5.5 rounded-3xl bg-gray-blue flex-shrink-0 transition hover:scale-105 w-26"
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  textAlign: "center",
                  color: "#1B2767",
                  width: "100%",
                  position: "relative",
                  pb: "10px",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background:
                      "linear-gradient(90deg, rgba(54,54,54,0) 0%, rgba(126,126,126,1) 50%, rgba(54,54,54,0) 100%)",
                  },
                }}
              >
                {day.date}
              </Typography>

              <img
                src={getWeatherIcon(day.main, day.description)}
                alt={day.main}
                className="w-12 h-12"
              />

              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#1B2767" }}
              >
                {day.temp}°C
              </Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TwoWeeksForecast;
