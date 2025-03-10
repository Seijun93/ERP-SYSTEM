import { Injectable, signal } from '@angular/core';

import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor() { }

  customers: Customer[] = [
    {
      id: 1,
      name: 'Testkunde',
      street: 'Teststraße 1',
      postcode: 11111,
      city: 'Testort',
      email: 'test@test.de',
      phone: '0123456789',
      mobile: '0987654321',
      text: 'Das ist eine Testbemerkung',
    },
  ]

  showCustomerDialog = signal(false);

  toggleCustomerDialog () {
    this.showCustomerDialog.update(value => !value)
    console.log(this.showCustomerDialog())
  }

  addCustomer (customer: Customer) {
    if (this.customers.length === 0) {
      customer.id = 1
    }
    else {
      const id = Math.max(...this.customers.map(customer => customer.id)) + 1
      customer.id = id
    }
    this.customers.push(customer)
  }

}
