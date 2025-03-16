import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  http = inject(HttpClient)

  constructor() {
    this.fetchCustomers()
    console.log(this.customers)
  }

  customers: Customer[] = []

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
    if (customer.number !== undefined) {
      //Update Customer
      const customerIndex = this.customers.findIndex(c => c.number === customer.number)
      this.customers[customerIndex] = customer
    }
    else {
      //Add new Customer
      if (this.customers.length === 0) {
        customer.number = 1
      }
      else {
        const customerNumber = Math.max(...this.customers.map(customer => customer.number)) + 1
        customer.number = customerNumber
      }
      this.createCustomer(customer)
      this.customers.push(customer)
    }
  }

  //CRUD Funktions

  createCustomer (customerData: Customer) {
    this.http.post(
      'https://erp-system-e5e14-default-rtdb.europe-west1.firebasedatabase.app/customers.json',
      customerData
    ).subscribe(resData => {
      console.log(resData)
    })
  }

  private fetchCustomers() {
    this.http
      .get<{[key: string]: Customer }>('https://erp-system-e5e14-default-rtdb.europe-west1.firebasedatabase.app/customers.json')
      .pipe(map(resData => {
        const customersArray: Customer[] = []
        for (const key in resData) {
          if (Object.prototype.hasOwnProperty.call(resData, key)) {
            customersArray.push({ ...resData[key], id:(key)})
          }
        }
        return customersArray
      }))
      .subscribe(customers => {
        for (const customer of customers) {
          this.customers.push(customer)
        }
    })
  }

}
