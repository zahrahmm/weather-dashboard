import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import WeatherInfo from "../components/WeatherInfo";
import MonthlyTempChart from "../components/MonthlyTempChart";

const Dashboard = () => {
  const [selectedCity, setSelectedCity] = useState("Tehran");

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      <main className="grow px-4 py-6">
        <div className="flex px-6 gap-10 justify-center items-center">
          <div className="basis-2/5">
            <WeatherInfo selectedCity={selectedCity} />
          </div>
          <div className="basis-3/5">
            <MonthlyTempChart city={selectedCity} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
