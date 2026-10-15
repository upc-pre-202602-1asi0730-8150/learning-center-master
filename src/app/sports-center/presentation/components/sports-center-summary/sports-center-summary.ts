import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { SportsCenterOccupancy } from '../../../domain/model/sports-center-occupancy.entity';

@Component({
  selector: 'app-sports-center-summary',
  imports: [MatCardModule, TranslatePipe],
  templateUrl: './sports-center-summary.html',
  styleUrl: './sports-center-summary.css',
})
export class SportsCenterSummary {
  /** Occupancy data of the sports center to display. */
  readonly occupancy = input.required<SportsCenterOccupancy>();
}
