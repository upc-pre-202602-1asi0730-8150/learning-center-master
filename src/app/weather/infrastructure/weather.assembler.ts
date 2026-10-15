import { WeatherReading } from '../domain/model/weather-reading.entity';
import { WeatherResponse } from './weather.response';

/**
 * @summary Converts an Open-Meteo response into a WeatherReading entity.
 * @author Roberto Gonzales Ayala
 */
export class WeatherAssembler {
  toEntityFromResponse(response: WeatherResponse): WeatherReading {
    return new WeatherReading(
      response.current.temperature_2m,
      response.current_units.temperature_2m,
      new Date(response.current.time),
    );
  }
}
