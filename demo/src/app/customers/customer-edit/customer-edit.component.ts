import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { map, switchMap } from 'rxjs/operators';
import { Segmento } from '../segmento';
import { of } from 'rxjs';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  template: `<ejs-combobox id='comboelement' [dataSource]='data' placeholder = 'Select a game'></ejs-combobox>`
})
export class CustomerEditComponent implements OnInit {

  id!: string;
  customer!: Customer;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService) {
  }


  get segmentoList(): Segmento[] {
    return this.customerService.segmentoList;
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

      this.customerService.findSegmento()
  }

  save() {
    this.customerService.save(this.customer).subscribe(
      customer => {
        this.customer = customer;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/customers']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/customers']);
  }
}
