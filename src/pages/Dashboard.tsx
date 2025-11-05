import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import WeatherInfo from "../components/WeatherInfo";
import MonthlyTempChart from "../components/MonthlyTempChart";
import TwoWeeksForecast from "../components/TwoWeeksForecast";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { i18n } = useTranslation();
  const [selectedCity, setSelectedCity] = useState("Tehran");

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      <main className="grow px-6 py-6 mb-20">
        <div
          className={`flex  gap-10 justify-center items-center mb-7 ${
            i18n.language === "fa" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <div className="basis-2/5">
            <WeatherInfo selectedCity={selectedCity} />
          </div>
          <div className="basis-3/5">
            <MonthlyTempChart city={selectedCity} />
          </div>
        </div>
        <TwoWeeksForecast city={selectedCity} />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
