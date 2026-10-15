import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherReading } from '../domain/model/weather-reading.entity';
import { WeatherApiEndpoint } from './weather-api-endpoint';

/**
 * @summary API facade of the weather bounded context.
 * @author Roberto Gonzales Ayala
 */
@Injectable({ providedIn: 'root' })
export class WeatherApi {
  private readonly weatherEndpoint = new WeatherApiEndpoint(inject(HttpClient));

  getCurrentWeather(latitude: number, longitude: number): Observable<WeatherReading> {
    return this.weatherEndpoint.getCurrentWeather(latitude, longitude);
  }
}
