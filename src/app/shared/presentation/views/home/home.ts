import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SportsCentersStore } from '../../../../sports-center/application/sports-center.store';
import { MySportsCenters } from '../../../../sports-center/presentation/components/my-sports-centers/my-sports-centers';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe, MySportsCenters],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly store = inject(SportsCentersStore);

  ngOnInit(): void {
    this.store.loadAll();
  }
}
