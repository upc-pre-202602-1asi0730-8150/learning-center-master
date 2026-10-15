/**
 * @summary Shape of a reservation as returned by the API.
 * @author Roberto Gonzales Ayala
 */
export interface ReservationResource {
  id: number;
  sportsCenterId: number;
  activityType: string;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: string;
}
