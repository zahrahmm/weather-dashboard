import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import logo from "../assets/image 1.svg";
import SettingsMenu from "./SettingsMenu";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ColorModeContext } from "../context/ColorModeContext";

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

interface HeaderProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const Header = ({ selectedCity, setSelectedCity }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const { darkMode } = useContext(ColorModeContext);

  return (
    <header
      className={`flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 py-3 px-6 
      shadow-[0_4px_10px_rgba(0,0,0,0.15)] 
      ${
        darkMode
          ? "bg-[#151D32] text-[#F3F4F7] shadow-[0_4px_10px_rgba(166, 165, 165, 0.15)] "
          : "bg-white text-[#003464] shadow-[0_4px_10px_rgba(0,0,0,0.15)] "
      }
      ${i18n.language === "en" ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      <div
        className={`flex items-center gap-2 
        ${i18n.language === "en" ? "flex-row" : "flex-row-reverse"}`}
      >
        <img src={logo} alt="Logo" className="h-8 w-auto" />
        <h2 className="text-sm font-semibold ">{t("weatherDashboard")}</h2>
      </div>

      <div
        className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full md:w-auto
        ${i18n.language === "en" ? "sm:flex-row" : "sm:flex-row-reverse"}`}
      >
        <FormControl fullWidth sx={{ minWidth: 200 }}>
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
