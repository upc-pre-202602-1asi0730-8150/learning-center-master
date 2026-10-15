import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { ActivityType } from '../domain/model/activity-type';
import { Reservation } from '../domain/model/reservation.entity';
import { ReservationResource } from './reservation.resource';
import { ReservationsResponse } from './reservations.response';
import { ReservationDraft } from '../domain/model/reservation-draft.entity';
import { CreateReservationRequest } from './create-reservation.request';

export class ReservationAssembler implements BaseAssembler<Reservation, ReservationResource> {
  toEntityFromResource(resource: ReservationResource): Reservation {
    return new Reservation(
      resource.id,
      resource.sportsCenterId,
      resource.activityType as ActivityType,
      resource.participantName,
      resource.participants,
      resource.weatherTemperature,
      new Date(resource.reservedAt),
    );
  }

  toEntitiesFromResponse(response: ReservationsResponse): Reservation[] {
    return response.map((resource) => this.toEntityFromResource(resource));
  }

  toRequestFromDraft(draft: ReservationDraft): CreateReservationRequest {
    return {
      sportsCenterId: draft.sportsCenterId,
      activityType: draft.activityType,
      participantName: draft.participantName,
      participants: draft.participants,
      weatherTemperature: draft.weatherTemperature,
      reservedAt: draft.reservedAt.toISOString(),
    };
  }
}
