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

interface HeaderProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const Header = ({ selectedCity, setSelectedCity }: HeaderProps) => {
  const { t, i18n } = useTranslation();

  return (
    <header
      className={`flex items-center justify-between py-3 px-6 shadow-[0_4px_10px_rgba(0,0,0,0.15)] bg-white ${
        i18n.language === "en" ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Logo + Title */}
      <div
        className={`flex items-center gap-2 ${
          i18n.language === "en" ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <img src={logo} alt="Logo" className="h-8 w-auto" />
        <h2 className="text-sm font-semibold text-gray-700">
          {t("weatherDashboard")}
        </h2>
      </div>

      {/* City Selector + Settings */}
      <div
        className={`flex items-center gap-5 ${
          i18n.language === "en" ? "flex-row" : "flex-row-reverse"
        }`}
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
