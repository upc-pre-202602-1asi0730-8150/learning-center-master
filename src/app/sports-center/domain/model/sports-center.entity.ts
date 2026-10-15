import { ActivityType } from './activity-type';

export class SportsCenter {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly activityType: ActivityType,
    readonly capacity: number,
    readonly latitude: number,
    readonly longitude: number,
  ) {}
}
