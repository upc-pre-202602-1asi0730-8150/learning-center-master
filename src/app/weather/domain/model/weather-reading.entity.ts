/**
 * @summary Domain entity representing a weather reading at a sports center location.
 * @author Roberto Gonzales Ayala
 */
export class WeatherReading {
  constructor(
    readonly temperature: number,
    readonly unit: string,
    readonly time: Date,
  ) {}
}
