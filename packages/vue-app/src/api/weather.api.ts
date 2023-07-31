import {
  mdiSnowflake,
  mdiSnowflakeAlert,
  mdiWeatherCloudy,
  mdiWeatherFog,
  mdiWeatherLightningRainy,
  mdiWeatherPartlyCloudy,
  mdiWeatherPartlyRainy,
  mdiWeatherPartlySnowy,
  mdiWeatherPartlySnowyRainy,
  mdiWeatherPouring,
  mdiWeatherRainy,
  mdiWeatherSnowy,
  mdiWeatherSnowyHeavy,
  mdiWeatherSnowyRainy,
  mdiWeatherSunny,
} from "@mdi/js";
import axios from "axios";

type GetCurrentWeatherForLocationParams = {
  latitude: string;
  longitude: string;
  timezone: string;
};

interface GetCurrentWeatherForLocationResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: Currentweather;
}

interface Currentweather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

const weatherImages = {
  CLEAR_SKY: mdiWeatherSunny,
  MAINLY_CLEAR: mdiWeatherSunny,
  PARTLY_CLOUDY: mdiWeatherPartlyCloudy,
  OVERCAST: mdiWeatherCloudy,
  FOG: mdiWeatherFog,
  DRIZZLE_LIGHT: mdiWeatherPouring,
  DRIZZLE_MODERATE: mdiWeatherPartlyRainy,
  DRIZZLE_DENSE: mdiWeatherPartlyRainy,
  FREEZING_DRIZZLE_LIGHT: mdiSnowflake,
  FREEZING_DRIZZLE_DENSE: mdiSnowflakeAlert,
  RAIN_SLIGHT: mdiWeatherPartlyRainy,
  RAIN_MODERATE: mdiWeatherRainy,
  RAIN_HEAVY: mdiWeatherRainy,
  FREEZING_RAIN_LIGHT: mdiWeatherPartlySnowyRainy,
  FREEZING_RAIN_HEAVY: mdiWeatherSnowyRainy,
  SNOW_FALL_SLIGHT: mdiWeatherPartlySnowy,
  SNOW_FALL_MODERATE: mdiWeatherSnowy,
  SNOW_FALL_HEAVY: mdiWeatherSnowyHeavy,
  SNOW_GRAINS: mdiWeatherSnowy,
  RAIN_SHOWERS_SLIGHT: mdiWeatherPartlyRainy,
  RAIN_SHOWERS_MODERATE: mdiWeatherRainy,
  RAIN_SHOWERS_VIOLENT: mdiWeatherRainy,
  SNOW_SHOWERS_SLIGHT: mdiWeatherPartlySnowyRainy,
  SNOW_SHOWERS_HEAVY: mdiWeatherSnowyRainy,
  THUNDERSTORM_SLIGHT_MODERATE: mdiWeatherLightningRainy,
  THUNDERSTORM_SLIGHT_HAIL: mdiWeatherLightningRainy,
  THUNDERSTORM_HEAVY_HAIL: mdiWeatherLightningRainy,
};

const weatherCodes: Record<number, { description: string; image: string }> = {
  0: {
    description: "Clear sky",
    image: weatherImages.CLEAR_SKY,
  },
  1: {
    description: "Mainly clear",
    image: weatherImages.MAINLY_CLEAR,
  },
  2: {
    description: "Partly cloudy",
    image: weatherImages.PARTLY_CLOUDY,
  },
  3: {
    description: "Overcast",
    image: weatherImages.OVERCAST,
  },
  45: {
    description: "Fog and depositing rime fog",
    image: weatherImages.FOG,
  },
  48: {
    description: "Fog and depositing rime fog",
    image: weatherImages.FOG,
  },
  51: {
    description: "Drizzle: Light intensity",
    image: weatherImages.DRIZZLE_LIGHT,
  },
  53: {
    description: "Drizzle: Moderate intensity",
    image: weatherImages.DRIZZLE_MODERATE,
  },
  55: {
    description: "Drizzle: Dense intensity",
    image: weatherImages.DRIZZLE_DENSE,
  },
  56: {
    description: "Freezing Drizzle: Light intensity",
    image: weatherImages.FREEZING_DRIZZLE_LIGHT,
  },
  57: {
    description: "Freezing Drizzle: Dense intensity",
    image: weatherImages.FREEZING_DRIZZLE_DENSE,
  },
  61: {
    description: "Rain: Slight intensity",
    image: weatherImages.RAIN_SLIGHT,
  },
  63: {
    description: "Rain: Moderate intensity",
    image: weatherImages.RAIN_MODERATE,
  },
  65: {
    description: "Rain: Heavy intensity",
    image: weatherImages.RAIN_HEAVY,
  },
  66: {
    description: "Freezing Rain: Light intensity",
    image: weatherImages.FREEZING_RAIN_LIGHT,
  },
  67: {
    description: "Freezing Rain: Heavy intensity",
    image: weatherImages.FREEZING_RAIN_HEAVY,
  },
  71: {
    description: "Snow fall: Slight intensity",
    image: weatherImages.SNOW_FALL_SLIGHT,
  },
  73: {
    description: "Snow fall: Moderate intensity",
    image: weatherImages.SNOW_FALL_MODERATE,
  },
  75: {
    description: "Snow fall: Heavy intensity",
    image: weatherImages.SNOW_FALL_HEAVY,
  },
  77: {
    description: "Snow grains",
    image: weatherImages.SNOW_GRAINS,
  },
  80: {
    description: "Rain showers: Slight intensity",
    image: weatherImages.RAIN_SHOWERS_SLIGHT,
  },
  81: {
    description: "Rain showers: Moderate intensity",
    image: weatherImages.RAIN_SHOWERS_MODERATE,
  },
  82: {
    description: "Rain showers: Violent intensity",
    image: weatherImages.RAIN_SHOWERS_VIOLENT,
  },
  85: {
    description: "Snow showers: Slight intensity",
    image: weatherImages.SNOW_SHOWERS_SLIGHT,
  },
  86: {
    description: "Snow showers: Heavy intensity",
    image: weatherImages.SNOW_SHOWERS_HEAVY,
  },
  95: {
    description: "Thunderstorm: Slight or moderate",
    image: weatherImages.THUNDERSTORM_SLIGHT_MODERATE,
  },
  96: {
    description: "Thunderstorm with slight hail",
    image: weatherImages.THUNDERSTORM_SLIGHT_HAIL,
  },
  99: {
    description: "Thunderstorm with heavy hail",
    image: weatherImages.THUNDERSTORM_HEAVY_HAIL,
  },
};

const unknownWheaterCode = {
  description: "Thunderstorm with heavy hail",
  image: weatherImages.THUNDERSTORM_HEAVY_HAIL,
};

const weatherApiBaseUrl = "https://api.open-meteo.com/v1";

const httpClient = axios.create({
  baseURL: weatherApiBaseUrl,
});

const getCurrentWeatherForLocationDefaultParams = {
  format: "json",
  current_weather: "true",
  forecast_days: "1",
};

async function getCurrentWeatherForLocation(
  args: GetCurrentWeatherForLocationParams
) {
  const params = new URLSearchParams({
    ...args,
    ...getCurrentWeatherForLocationDefaultParams,
  });

  const response = await httpClient.get<GetCurrentWeatherForLocationResponse>(
    "/forecast",
    { params }
  );

  const weatherInfo = weatherCodes[response.data.current_weather.weathercode];

  return {
    ...response.data,
    weatherCodeInfo: weatherInfo || unknownWheaterCode,
  };
}

const weatherApi = { getCurrentWeatherForLocation };
export { weatherApi };
