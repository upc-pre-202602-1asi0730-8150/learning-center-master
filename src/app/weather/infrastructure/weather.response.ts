import { WeatherCurrentResource } from './weather-current.resource';

/**
 * @summary Response of the Open-Meteo forecast endpoint.
 * @author Roberto Gonzales Ayala
 */
export interface WeatherResponse {
  latitude: number;
  longitude: number;
  current_units: { time: string; interval: string; temperature_2m: string };
  current: WeatherCurrentResource;
}
