import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: 'customers',
    component: CustomerListComponent
  },
  {
    path: 'customers/:id',
    component: CustomerEditComponent,
  },
  {
    path: 'customers/details/:id',
    component: CustomerDetailsComponent,
  }
];
