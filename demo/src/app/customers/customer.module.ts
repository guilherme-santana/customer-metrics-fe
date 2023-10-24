import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerService } from './customer.service';
import { CUSTOMER_ROUTES } from './customer.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(CUSTOMER_ROUTES)
  ],
  declarations: [
    CustomerListComponent,
    CustomerEditComponent,
    CustomerDetailsComponent
  ],
  providers: [CustomerService],
  exports: []
})
export class CustomerModule { }
