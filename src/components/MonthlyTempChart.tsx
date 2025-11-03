import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";

interface MonthlyTemp {
  month: string;
  temp: number;
}

const MonthlyTempChart = ({ city }: { city: string }) => {
  const [dataset, setDataset] = useState<MonthlyTemp[]>([]);

  useEffect(() => {
    const data: MonthlyTemp[] = [
      { month: "Jan", temp: 15 },
      { month: "Feb", temp: 25 },
      { month: "Mar", temp: 22 },
      { month: "Apr", temp: 18 },
      { month: "May", temp: 26 },
      { month: "Jun", temp: 24 },
      { month: "Jul", temp: 32 },
      { month: "Aug", temp: 30 },
      { month: "Sep", temp: 34 },
      { month: "Oct", temp: 28 },
      { month: "Nov", temp: 27 },
      { month: "Dec", temp: 29 },
    ];
    setDataset(data);
  }, [city]);

  return (
    <div className="light-gray-blue rounded-3xl px-5 py-6 overflow-x-auto">
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 700, color: "#1B2767", fontSize: "18px" }}
      >
        Average Monthly Temperature
      </Typography>

      <div>
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
          grid={{ horizontal: true }}
          height={180}
          sx={{
            "& .MuiChartsAxis-tickLabel": {
              fontSize: 10,
            },
            "& .MuiChartsAxis-line": {
              stroke: "#cbd5e1",
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
    </div>
  );
};

export default MonthlyTempChart;
