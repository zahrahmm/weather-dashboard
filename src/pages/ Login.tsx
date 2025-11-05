import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/Frame 10.svg";
import loginImageDark from "../assets/Frame 10(2).svg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { ColorModeContext } from "../context/ColorModeContext";

const Login = () => {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("English");
  const { t, i18n } = useTranslation();
  const { darkMode } = useContext(ColorModeContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    localStorage.setItem("user", name);
    navigate("/dashboard");
  };

  const handleChange = (e: SelectChangeEvent) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang === "Persian" ? "fa" : "en");
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 md:px-8 transition-all duration-300 ${
        darkMode ? "bg-[#151D32] text-[#F3F4F7]" : "bg-white text-gray-800"
      }`}
    >
      <div
        className={`flex flex-col md:flex-row rounded-[12px] mx-auto w-full max-w-[900px] overflow-hidden mb-10 md:pl-5 transition-all duration-300 ${
          darkMode
            ? "bg-[#292F45] shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
            : "bg-white shadow-[0_4px_8px_rgba(0,0,0,0.25)]"
        } ${language === "Persian" ? "md:flex-row-reverse" : ""}`}
      >
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col justify-between flex-1 px-6 py-8 transition-all duration-300 ${
            darkMode ? "bg-[#292F45] text-[#F3F4F7]" : "bg-white text-gray-800"
          }`}
        >
          <div className="flex flex-col gap-8 w-full">
            <h2
              className={`text-[26px] font-bold leading-[100%] text-center ${
                darkMode ? "text-[#F3F4F7]" : "text-gray-800"
              }`}
            >
              {t("login")}
            </h2>

            <TextField
              id="outlined-basic"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("enterName")}
              variant="outlined"
              size="medium"
              fullWidth
              InputProps={{
                style: {
                  textAlign: language === "Persian" ? "right" : "left",
                  direction: language === "Persian" ? "rtl" : "ltr",
                  color: darkMode ? "#F3F4F7" : "#000",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: darkMode ? "#F3F4F7" : "rgba(0,0,0,0.23)",
                },
                "& .MuiInputLabel-root": {
                  color: darkMode ? "#F3F4F7" : "rgba(0,0,0,0.6)",
                },
              }}
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            className="w-full py-3 font-medium text-[15px] leading-6 mt-6"
            type="submit"
          >
            {t("loginButton")}
          </Button>
        </form>

        <div
          className={`flex-1 flex items-center justify-center p-4 md:p-0 transition-all duration-300 ${
            darkMode ? "bg-[#292F45]" : "bg-white"
          }`}
        >
          <img
            src={darkMode ? loginImageDark : loginImage}
            alt="Login"
            className="w-[80%] sm:w-[60%] md:w-full h-auto object-contain"
          />
        </div>
      </div>

      <FormControl size="small" variant="standard" className="w-[220px]">
        <InputLabel id="select-label">Language</InputLabel>
        <Select
          labelId="select-label"
          value={language}
          label="Language"
          onChange={handleChange}
        >
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Persian">فارسی</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Login;
