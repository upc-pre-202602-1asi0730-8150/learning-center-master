import { Routes } from '@angular/router';
import { NewReservation } from './sports-center/presentation/views/new-reservation/new-reservation';
import { Home } from './shared/presentation/views/home/home';
import { sportsCentersRoutes } from './sports-center/presentation/sports-centers.routes';

export const routes: Routes = [
  {path: 'home', component: Home, title: 'Home'},
  {path:'reservations', children: sportsCentersRoutes},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];
