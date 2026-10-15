import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { TranslatePipe } from '@ngx-translate/core';
import { SportsCentersStore } from '../../../application/sports-center.store';
import { SportsCenterSummary } from '../sports-center-summary/sports-center-summary';

@Component({
  selector: 'app-my-sports-centers',
  imports: [MatGridListModule, TranslatePipe, SportsCenterSummary],
  templateUrl: './my-sports-centers.html',
  styleUrl: './my-sports-centers.css',
})
export class MySportsCenters {
  protected readonly store = inject(SportsCentersStore);
}
