import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../domain/model/reservation.entity';
import { SportsCenter } from '../domain/model/sports-center.entity';
import { ReservationsApiEndpoint } from './reservations-api-endpoint';
import { SportsCentersApiEndpoint } from './sports-centers-api-endpoint';
import { ReservationDraft } from '../domain/model/reservation-draft.entity';

@Injectable({ providedIn: 'root' })
export class SportsCentersApi {
  private readonly http = inject(HttpClient);
  private readonly sportsCentersEndpoint = new SportsCentersApiEndpoint(this.http);
  private readonly reservationsEndpoint = new ReservationsApiEndpoint(this.http);

  getSportsCenters(): Observable<SportsCenter[]> {
    return this.sportsCentersEndpoint.getAll();
  }

  getReservations(): Observable<Reservation[]> {
    return this.reservationsEndpoint.getAll();
  }

  createReservation(draft: ReservationDraft): Observable<Reservation> {
    return this.reservationsEndpoint.create(draft);
  }
}
