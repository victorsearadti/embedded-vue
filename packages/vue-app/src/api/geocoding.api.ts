import axios from "axios";

export interface GetLocationByNameResponse {
  results: LocationResult[];
  generationtime_ms: number;
}

export interface LocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id?: number;
  timezone: string;
  country_id: number;
  country: string;
  admin1: string;
  admin2?: string;
}

const geocodingBaseUrl = "https://geocoding-api.open-meteo.com/v1";

const httpClient = axios.create({
  baseURL: geocodingBaseUrl,
});

const apiConfig = {
  language: "en",
  format: "json",
};

async function getLocationByName(name: string) {
  const params = new URLSearchParams({ name, ...apiConfig });

  const response = await httpClient.get<GetLocationByNameResponse>("/search", {
    params,
  });

  return response.data;
}

const geocodingApi = { getLocationByName };

export { geocodingApi };
