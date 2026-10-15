/**
 * @summary Shape of a sports center as returned by the API.
 * @author Roberto Gonzales Ayala
 */
export interface SportsCenterResource {
  id: number;
  name: string;
  activityType: string;
  capacity: number;
  latitude: number;
  longitude: number;
}
