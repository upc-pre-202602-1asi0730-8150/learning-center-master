import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { WeatherStore } from '../../../../weather/application/weather.store';
import { SportsCentersStore } from '../../../application/sports-center.store';
import { ACTIVITY_TYPES, ActivityType } from '../../../domain/model/activity-type';
import { CapacityExceededError } from '../../../domain/model/capacity-exceeded.error';

/** Validator: the value must not be empty nor contain only spaces. */
function notBlank(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  return typeof value === 'string' && value.trim().length === 0 ? { blank: true } : null;
}

/**
 * @summary New Reservation view: reactive form to register participants at a sports center.
 * @author Roberto Gonzales Ayala
 */
@Component({
  selector: 'app-new-reservation',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    TranslatePipe,
  ],
  templateUrl: './new-reservation.html',
  styleUrl: './new-reservation.css',
})
export class NewReservation implements OnInit {
  private readonly router = inject(Router);
  private readonly sportsCentersStore = inject(SportsCentersStore);
  protected readonly weatherStore = inject(WeatherStore);

  /** Activity types offered in the select. */
  protected readonly activityTypes = ACTIVITY_TYPES;

  private readonly selectedActivityType = signal<ActivityType | null>(null);

  /** Available capacity of the sports center of the selected activity, or null if none is selected. */
  protected readonly availableCapacity = computed(() => {
    const activityType = this.selectedActivityType();
    if (!activityType) {
      return null;
    }
    const occupancy = this.sportsCentersStore
      .occupancies()
      .find((item) => item.sportsCenter.activityType === activityType);
    return occupancy ? occupancy.availableCapacity : null;
  });

  /** Whether a save is in progress. */
  protected readonly saving = signal(false);

  /** Translation key of the error shown when saving fails. */
  protected readonly saveErrorKey = signal<string | null>(null);

  /** Validator: participants cannot exceed the available capacity. */
  private readonly withinCapacity: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const available = this.availableCapacity();
    const value = control.value;
    return available !== null && typeof value === 'number' && value > available
      ? { exceedsCapacity: true }
      : null;
  };

  protected readonly form = new FormGroup({
    activityType: new FormControl<ActivityType | null>(null, [Validators.required]),
    participantName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, notBlank],
    }),
    participants: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.pattern('^[0-9]+$'),
      this.withinCapacity,
    ]),
  });

  ngOnInit(): void {
    this.sportsCentersStore.loadAll();
    this.weatherStore.reset();
  }

  /** When an activity is selected, requests the weather at its sports center and revalidates the participants. */
  protected onActivityTypeChange(activityType: ActivityType): void {
    this.selectedActivityType.set(activityType);
    this.form.controls.participants.updateValueAndValidity();
    const sportsCenter = this.sportsCentersStore.findSportsCenterByActivityType(activityType);
    if (sportsCenter) {
      this.weatherStore.loadCurrentWeather(sportsCenter.latitude, sportsCenter.longitude);
    }
  }

  /** Whether the Create button must be disabled. A valid weather reading is required. */
  protected get cannotCreate(): boolean {
    return this.form.invalid || !this.weatherStore.reading() || this.saving();
  }

  /** Saves the reservation. It navigates to /home only after it was saved successfully. */
  protected onSubmit(): void {
    const reading = this.weatherStore.reading();
    const { activityType, participantName, participants } = this.form.getRawValue();
    if (this.form.invalid || !reading || !activityType || participants === null) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.saveErrorKey.set(null);
    this.sportsCentersStore
      .createReservation({
        activityType,
        participantName: participantName.trim(),
        participants,
        weatherTemperature: reading.temperature,
      })
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.router.navigate(['/home']);
        },
        error: (error: unknown) => {
          this.saving.set(false);
          this.saveErrorKey.set(
            error instanceof CapacityExceededError
              ? 'new-reservation.error-capacity'
              : 'new-reservation.error-save',
          );
        },
      });
  }

  /** Goes back to Home without saving. */
  protected onCancel(): void {
    this.router.navigate(['/home']);
  }
}
