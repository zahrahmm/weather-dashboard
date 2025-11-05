import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface MonthlyTemp {
  month: string;
  temp: number;
}

const MonthlyTempChart = ({ city }: { city: string }) => {
  const { t, i18n } = useTranslation();
  const [dataset, setDataset] = useState<MonthlyTemp[]>([]);
  const isFarsi = i18n.language === "fa";

  useEffect(() => {
    const monthsFa = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];

    const monthsEn = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const months = isFarsi ? [...monthsFa].reverse() : monthsEn;
    const temps = [15, 25, 22, 18, 26, 24, 32, 30, 34, 28, 27, 29];

    const data: MonthlyTemp[] = months.map((month, i) => ({
      month,
      temp: isFarsi ? temps[temps.length - 1 - i] : temps[i],
    }));

    setDataset(data);
  }, [city, isFarsi]);

  return (
    <div
      className={`light-gray-blue rounded-3xl px-5 py-6 overflow-x-auto ${
        isFarsi ? "text-right" : "text-left"
      }`}
      dir={isFarsi ? "rtl" : "ltr"}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "#1B2767",
          fontSize: "18px",
          mb: 1,
        }}
      >
        {t("AverageMonthlyTemperature")}
      </Typography>

      <LineChart
        dataset={dataset}
        xAxis={[
          {
            dataKey: "month",
            scaleType: "band",
          },
        ]}
        yAxis={[
          {
            position: isFarsi ? "right" : "left",
            min: 10,
            max: 40,
            tickNumber: 4,
            valueFormatter: (value: number) => `${value}°C`,
          },
        ]}
        series={[
          {
            dataKey: "temp",
            curve: "monotoneX",
            color: "url(#tempGradient)",
            area: true,
            showMark: false,
          },
        ]}
        height={180}
        grid={{ horizontal: true }}
        sx={{
          direction: isFarsi ? "rtl" : "ltr",
          "& .MuiChartsAxis-tickLabel": {
            fill: "#1B2767",
            fontSize: 10,
          },
          "& .MuiChartsAxis-line": {
            stroke: "#CBD5E1",
          },
          "& .MuiLineElement-root": {
            strokeWidth: 3,
          },
          "& .MuiAreaElement-root": {
            fillOpacity: 0.05,
          },
          "& .MuiChartsGrid-line": {
            strokeDasharray: "4 4",
            stroke: "#AFBCC4",
          },
        }}
      >
        <defs>
          <linearGradient id="tempGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#4CDFE8" />
            <stop offset="100%" stopColor="#7947F7" />
          </linearGradient>
        </defs>
      </LineChart>
    </div>
  );
};

export default MonthlyTempChart;
