import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import logo from "../assets/image 1.svg";
import SettingsMenu from "./SettingsMenu";
import { useTranslation } from "react-i18next";

const cities = [
  "Tehran",
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Los Angeles",
  "Berlin",
  "Moscow",
  "Beijing",
];

const Header = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const { t, i18n } = useTranslation();

  return (
    <header
      className={`flex items-center justify-between py-3 px-6 shadow-[0_4px_10px_rgba(0,0,0,0.15)] ${
        i18n.language === "en" ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <div
        className={`flex items-center gap-2 ${
          i18n.language === "en" ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <img src={logo} alt="Logo" />
        <h2 className="text-[12px] leading-[150%]">{t("weatherDashboard")}</h2>
      </div>

      <div
        className={`flex gap-5 ${
          i18n.language === "en" ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <FormControl fullWidth sx={{ minWidth: 300 }}>
          <InputLabel id="city-select-label">{t("searchCity")}</InputLabel>
          <Select
            labelId="city-select-label"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            label="Select Your City"
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <SettingsMenu />
      </div>
    </header>
  );
};

export default Header;
