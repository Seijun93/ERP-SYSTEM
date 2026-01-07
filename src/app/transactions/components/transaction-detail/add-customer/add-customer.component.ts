import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { DataTableComponent } from "../../../../core/framework/data-table/data-table.component";

import { CustomersService } from '../../../../customers/services/customers.service';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { Customer } from '../../../../customers/models/customer.model';


@Component({
  selector: 'app-add-customer',
  imports: [FloatLabelModule, IconField, InputIcon, DataTableComponent, FormsModule, ReactiveFormsModule, InputTextModule,],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {

  @Output() close = new EventEmitter<Customer>();

  customerService: CustomersService = inject(CustomersService)

  customers = this.customerService.customers
  filteredCustomers: Customer[] = this.customers

  searchForm!: FormGroup

  //Inhaltskonfiguration der Kundentabelle
  tablePropertys: any[] = [
    {label: 'Kundennummer', key: 'number', class: 'min-w-40 w-40'},
    {label: 'Name', key: 'name', class: 'min-w-60 w-60'},
    {label: 'Straße', key: 'street', class: 'min-w-80 w-80'},
    {label: 'PLZ', key: 'postcode', class: 'min-w-40 w-40'},
    {label: 'Ort', key: 'city', class: 'min-w-60 w-60'},
  ]

  constructor(private fb: FormBuilder) { 
    this.createForm()
  }

  createForm() {
    this.searchForm = this.fb.group({
      customerNumber: [''],
      customerName: [''],
      customerStreet: [''],
      customerPostalCode: [''],
      customerCity: ['']
    });
  }

  filterCustomers() {
    const { customerNumber, customerName, customerStreet, customerPostalCode, customerCity } = this.searchForm.value;

    this.filteredCustomers = this.customers.filter(customer => {
      return (
        (customerNumber ? customer.number.toString().includes(customerNumber) : true) &&
        (customerName ? customer.name.toLowerCase().includes(customerName.toLowerCase()) : true) &&
        (customerStreet ? customer.street.toLowerCase().includes(customerStreet.toLowerCase()) : true) &&
        (customerPostalCode ? customer.postcode.toString().includes(customerPostalCode) : true) &&
        (customerCity ? customer.city.toLowerCase().includes(customerCity.toLowerCase()) : true)
      );
    })
  }

  chooseCustomer(index: number) {
    const customer = this.filteredCustomers[index];
    if (customer) this.close.emit(customer);
  }
}
