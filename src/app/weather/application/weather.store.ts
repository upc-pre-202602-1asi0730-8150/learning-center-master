import { inject, Injectable, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherReading } from '../domain/model/weather-reading.entity';
import { WeatherApi } from '../infrastructure/weather-api';

/**
 * @summary State store of the weather bounded context, built with Angular Signals.
 * @author Roberto Gonzales Ayala
 */
@Injectable({ providedIn: 'root' })
export class WeatherStore {
  private readonly api = inject(WeatherApi);
  private subscription?: Subscription;

  private readonly readingSignal = signal<WeatherReading | null>(null);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal(false);

  readonly reading = this.readingSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  /** Requests the current weather. A previous pending request is cancelled. */
  loadCurrentWeather(latitude: number, longitude: number): void {
    this.subscription?.unsubscribe();
    this.readingSignal.set(null);
    this.errorSignal.set(false);
    this.loadingSignal.set(true);
    this.subscription = this.api.getCurrentWeather(latitude, longitude).subscribe({
      next: (reading) => {
        this.readingSignal.set(reading);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set(true);
        this.loadingSignal.set(false);
      },
    });
  }

  /** Clears the state. */
  reset(): void {
    this.subscription?.unsubscribe();
    this.readingSignal.set(null);
    this.loadingSignal.set(false);
    this.errorSignal.set(false);
  }
}
