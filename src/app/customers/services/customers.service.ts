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

  selectedCustomer: Customer | null = null

  showCustomerDialog = signal(false);

  toggleCustomerDialog () {
    this.showCustomerDialog.update(value => !value)
  }

  addCustomerDialog () {
    this.selectedCustomer = null
    this.toggleCustomerDialog()
  }

  saveCustomer (customer: Customer) {
    if (customer.id !== null) {
      //Update Customer
      const customerIndex = this.customers.findIndex(c => c.id === customer.id)
      this.customers[customerIndex] = customer
    }
    else {
      //Add new Customer
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

}
