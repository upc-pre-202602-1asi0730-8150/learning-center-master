import { Reservation } from './reservation.entity';
import { SportsCenter } from './sports-center.entity';

/**
 * @summary Occupancy of a sports center: its reservations, total participants and available capacity.
 * @author Roberto Gonzales Ayala
 */
export class SportsCenterOccupancy {
  constructor(
    readonly sportsCenter: SportsCenter,
    readonly reservations: Reservation[],
  ) {}

  /** Sum of the participants of all reservations. */
  get totalParticipants(): number {
    return this.reservations.reduce((total, reservation) => total + reservation.participants, 0);
  }

  /** Capacity minus the total participants. */
  get availableCapacity(): number {
    return this.sportsCenter.capacity - this.totalParticipants;
  }

  /** Whether the center has no reservations. */
  get isEmpty(): boolean {
    return this.reservations.length === 0;
  }
}
