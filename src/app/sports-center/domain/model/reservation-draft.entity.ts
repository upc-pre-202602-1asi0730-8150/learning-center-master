import { ActivityType } from './activity-type';

/**
 * @summary A reservation that has not been saved yet (it has no id; the API generates it).
 */
export class ReservationDraft {
  constructor(
    readonly sportsCenterId: number,
    readonly activityType: ActivityType,
    readonly participantName: string,
    readonly participants: number,
    readonly weatherTemperature: number,
    readonly reservedAt: Date,
  ) {}
}
