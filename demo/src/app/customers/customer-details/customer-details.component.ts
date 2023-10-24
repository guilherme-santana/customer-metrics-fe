import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html'
})
export class CustomerDetailsComponent implements OnInit {

  id!: string;
  customer!: Customer;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'create') { return of(new Customer()); }
          return this.customerService.findById(id);
        })
      )
      .subscribe(customer => {
          this.customer = customer;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      ); 

  }


  back() {
    this.router.navigate(['/customers']);
  }
}
