import { Customer } from './customer';
import { Segmento } from './segmento';
import { CustomerFilter } from './customer-filter';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class CustomerService {
  customerList: Customer[] = [];
  segmentoList: Segmento[] = [];

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Customer> {
    const url = `http://localhost:8080/customer/${id}`;

    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<Customer>(url, {headers});
  }

  load(filter: CustomerFilter): void {
    this.find(filter).subscribe(result => {
        this.customerList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  findSegmento(): void {
    const url = `http://localhost:8080/segmento`;
    const headers = new HttpHeaders().set('Accept', '*/*');
    this.http.get<Segmento[]>(url, {headers}).subscribe(result => {
        this.segmentoList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );  
  }


  find(filter: CustomerFilter): Observable<Customer[]> {
    const url = `http://localhost:8080/customer`;
    const headers = new HttpHeaders().set('Accept', '*/*');

    const params = {
      'customer': filter.customer,
      'segmento': filter.segmento,
    };

    return this.http.get<Customer[]>(url, {params, headers});
  }

  save(entity: Customer): Observable<Customer> {
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    if (entity.id) {
      url = `http://localhost:8080/customer/${entity.id.toString()}`;
      return this.http.put<Customer>(url, entity, {headers});
    } else {
      url = `http://localhost:8080/customer`;
      return this.http.post<Customer>(url, entity, {headers});
    }
  }

  delete(entity: Customer): Observable<Customer> {
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    if (entity.id) {
      url = `http://localhost:8080/customer/${entity.id.toString()}`;
      return this.http.delete<Customer>(url, {headers});
    }
    return EMPTY;
  }
}

