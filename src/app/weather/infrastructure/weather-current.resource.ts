/**
 * @summary Shape of the "current" object returned by the Open-Meteo API.
 * @author Roberto Gonzales Ayala
 */
export interface WeatherCurrentResource {
  time: string;
  interval: number;
  temperature_2m: number;
}
