import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/Frame 10.svg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("English");
  const { t, i18n } = useTranslation();
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
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div
        className={`flex flex-col md:flex-row rounded-[12px] max-w-[960px] mx-auto mb-10 
  ${
    language === "Persian"
      ? "md:flex-row-reverse"
      : "bg-white shadow-[0_4px_8px_rgba(0,0,0,0.25)] "
  }`}
      >
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col justify-between w-1/2 px-6 py-8 h-[420px]${
            language === "Persian"
              ? "bg-white shadow-[0_4px_8px_rgba(0,0,0,0.25)] "
              : ""
          }`}
        >
          <div className="flex flex-col gap-8">
            <h2 className="text-[26px] font-bold leading-[100%] text-center text-gray-800">
              {t("login")}
            </h2>
            <TextField
              id="outlined-basic"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("enterName")}
              variant="outlined"
              size="medium"
              InputProps={{
                style: {
                  textAlign: language === "Persian" ? "right" : "left",
                  direction: language === "Persian" ? "rtl" : "ltr",
                },
              }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            className="w-full py-3 font-medium text-[15px] leading-6"
            type="submit"
          >
            {t("loginButton")}
          </Button>
        </form>

        <div className="hidden md:block w-1/2 ">
          <img src={loginImage} alt="Login" className="w-full object-contain" />
        </div>
      </div>
      <FormControl size="small" variant="standard" className="w-[220px] ">
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
