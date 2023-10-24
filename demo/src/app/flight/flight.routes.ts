import { Routes } from '@angular/router';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';

export const FLIGHT_ROUTES: Routes = [
  {
    path: 'flights',
    component: FlightListComponent
  },
  {
    path: 'flights/:id',
    component: FlightEditComponent,
  },
  {
    path: 'flights/details/:id',
    component: FlightDetailsComponent,
  }
];
