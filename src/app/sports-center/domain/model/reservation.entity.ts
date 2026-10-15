import { ActivityType } from './activity-type';

export class Reservation {
  constructor(
    readonly id: number,
    readonly sportsCenterId: number,
    readonly activityType: ActivityType,
    readonly participantName: string,
    readonly participants: number,
    readonly weatherTemperature: number,
    readonly reservedAt: Date,
  ) {}
}
