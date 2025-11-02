import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  //   Box,
} from "@mui/material";
// import { getWeatherByCity } from "../services/weatherService";

const WeatherCard = () => {
  const [city, setCity] = useState("Tehran");
  //   const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      setError(null);
      //   const data = await getWeatherByCity(city);
      //   setWeather(data);
    } catch {
      setError("City not found!");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <Card sx={{ mt: 4, p: 2 }}>
      <CardContent>
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={fetchWeather}>
          Search
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
