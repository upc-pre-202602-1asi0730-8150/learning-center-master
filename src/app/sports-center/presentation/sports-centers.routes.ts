import { Routes } from '@angular/router';
import { NewReservation } from './views/new-reservation/new-reservation';

export const sportsCentersRoutes: Routes =[
  {path:'new', component: NewReservation, title:'New Reservation'},
];
