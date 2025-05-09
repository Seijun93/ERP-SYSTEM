import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer.model';
import { CreateCustomerComponent } from "../create-customer/create-customer.component";
import { DataTableComponent } from '../../../core/framework/data-table/data-table.component';

@Component({
  selector: 'app-customers',
  imports: [
    ButtonModule,
    TableModule,
    DialogModule,
    CreateCustomerComponent,
    DataTableComponent
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  customersService = inject(CustomersService)

  customers: Customer[] = this.customersService.customers
  showCustomersDialog: boolean = false

  tablePropertys: any[] = [
    {label: 'Kundennummer', key: 'number', class: 'min-w-40 w-40'},
    {label: 'Name', key: 'name', class: 'min-w-60 w-60'},
    {label: 'Straße', key: 'street', class: 'min-w-80 w-80'},
    {label: 'PLZ', key: 'postcode', class: 'min-w-40 w-40'},
    {label: 'Ort', key: 'city', class: 'min-w-60 w-60'},
    {label: 'Telefon', key: 'phone', class: 'min-w-50 w-50'},
    {label: 'Mobil', key: 'mobile', class: 'min-w-50 w-50'},
    {label: 'E-Mail', key: 'email', class: 'min-w-80 w-80'},
  ]

  openCustomer(index: number) {
    this.customersService.selectedCustomer = this.customersService.customers[index]
    this.customersService.showCustomerDialog.update(value => !value)
  }

}