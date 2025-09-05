import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  http = inject(HttpClient)
  router = inject(Router)

  constructor() {
    this.readCustomers()
  }

  customers: Customer[] = []

  // selectedCustomer: Customer | null = null

  addCustomer () {
    this.router.navigate(['/kunden/anlegen'])
  }

  saveCustomer (customer: Customer) {
    if (customer.number !== null) {
      //Update Customer
      console.log('update',customer)
      this.updateCustomer(customer)
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
    }
  }

  //CRUD Funktionen

  //Create Funktion
  createCustomer (customerData: Customer) {
    this.http.post<{ name: string }>(
      'https://erp-system-e5e14-default-rtdb.europe-west1.firebasedatabase.app/customers.json',
      customerData
    ).subscribe(resData => {
      customerData.id = resData.name
      this.customers.push(customerData)
    })
  }

  //Read Funktion
  private readCustomers() {
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

  //Update Funktion

  updateCustomer(updatedCustomer: Customer) {
    const index = this.customers.findIndex(c => c.number === updatedCustomer.number)
    updatedCustomer.id = this.customers[index].id

    if (updatedCustomer === null || !updatedCustomer.id) {
      console.log('crash', updatedCustomer, !updatedCustomer.id)
      return
    }

    this.http.patch(
      `https://erp-system-e5e14-default-rtdb.europe-west1.firebasedatabase.app/customers/${updatedCustomer.id}.json`,
      updatedCustomer
    ).subscribe(() => {
      console.log('update gesendet')
      if (index !== -1) {
        this.customers[index] = updatedCustomer!
      }
    })


  }

  //Delete Funktion
  deleteCustomer(id?: string) {
    if (id === null) {
      return
    }
    this.http.delete(`https://erp-system-e5e14-default-rtdb.europe-west1.firebasedatabase.app/customers/${id}.json`)
    .subscribe(() => {
      const deletedIndex = this.customers.findIndex(c => c.id === id)
      if (deletedIndex !== -1) {
        this.customers.splice(deletedIndex, 1)
      }
      this.router.navigate(['/kunden'])
    },error => {
      console.error('❌ Fehler beim Löschen des Kunden:', error)
      alert('❌ Fehler beim Löschen des Kunden')
    })
  }

}
