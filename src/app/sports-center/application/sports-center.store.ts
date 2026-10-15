import { computed, inject, Injectable, signal } from '@angular/core';
import { forkJoin, Observable, switchMap, tap, throwError } from 'rxjs';
import { ActivityType } from '../domain/model/activity-type';
import { CapacityExceededError } from '../domain/model/capacity-exceeded.error';
import { ReservationDraft } from '../domain/model/reservation-draft.entity';
import { Reservation } from '../domain/model/reservation.entity';
import { SportsCenterOccupancy } from '../domain/model/sports-center-occupancy.entity';
import { SportsCenter } from '../domain/model/sports-center.entity';
import { SportsCentersApi } from '../infrastructure/sports-center-api';

/**
 * @summary Values required to register a new reservation.
 * @author Roberto Gonzales Ayala
 */
export interface NewReservationValues {
  activityType: ActivityType;
  participantName: string;
  participants: number;
  weatherTemperature: number;
}

/**
 * @summary State store of the sports-centers bounded context, built with Angular Signals.
 * @author Roberto Gonzales Ayala
 */
@Injectable({ providedIn: 'root' })
export class SportsCentersStore {
  private readonly api = inject(SportsCentersApi);

  private readonly sportsCentersSignal = signal<SportsCenter[]>([]);
  private readonly reservationsSignal = signal<Reservation[]>([]);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal(false);

  readonly sportsCenters = this.sportsCentersSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  /** Occupancy of every sports center, recalculated whenever the data changes. */
  readonly occupancies = computed(() =>
    this.sportsCentersSignal().map(
      (sportsCenter) =>
        new SportsCenterOccupancy(
          sportsCenter,
          this.reservationsSignal().filter(
            (reservation) => reservation.sportsCenterId === sportsCenter.id,
          ),
        ),
    ),
  );

  /** Loads sports centers and reservations from the API. */
  loadAll(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(false);
    forkJoin({
      sportsCenters: this.api.getSportsCenters(),
      reservations: this.api.getReservations(),
    }).subscribe({
      next: ({ sportsCenters, reservations }) => {
        this.sportsCentersSignal.set(sportsCenters);
        this.reservationsSignal.set(reservations);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set(true);
        this.loadingSignal.set(false);
      },
    });
  }

  /** Finds the sports center of an activity type (there is exactly one per type). */
  findSportsCenterByActivityType(activityType: ActivityType): SportsCenter | undefined {
    return this.sportsCentersSignal().find(
      (sportsCenter) => sportsCenter.activityType === activityType,
    );
  }

  /**
   * Registers a reservation. Before the POST it fetches the reservations again and recalculates
   * the available capacity, so the validation never relies on stale data.
   */
  createReservation(values: NewReservationValues): Observable<Reservation> {
    const sportsCenter = this.findSportsCenterByActivityType(values.activityType);
    if (!sportsCenter) {
      return throwError(
        () => new Error(`No sports center found for the activity type ${values.activityType}.`),
      );
    }
    if (values.participants < 1) {
      return throwError(() => new Error('The participants must be greater than zero.'));
    }

    return this.api.getReservations().pipe(
      tap((reservations) => this.reservationsSignal.set(reservations)),
      switchMap((reservations) => {
        const occupancy = new SportsCenterOccupancy(
          sportsCenter,
          reservations.filter((reservation) => reservation.sportsCenterId === sportsCenter.id),
        );
        if (values.participants > occupancy.availableCapacity) {
          return throwError(() => new CapacityExceededError(occupancy.availableCapacity));
        }
        const draft = new ReservationDraft(
          sportsCenter.id,
          values.activityType,
          values.participantName,
          values.participants,
          values.weatherTemperature,
          new Date(),
        );
        return this.api.createReservation(draft);
      }),
      tap((reservation) =>
        this.reservationsSignal.update((reservations) => [...reservations, reservation]),
      ),
    );
  }
}
