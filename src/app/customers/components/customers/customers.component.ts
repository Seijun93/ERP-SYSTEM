import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer.model';
import { CreateCustomerComponent } from "../create-customer/create-customer.component";

@Component({
  selector: 'app-customers',
  imports: [
    ButtonModule,
    TableModule,
    DialogModule,
    CreateCustomerComponent
],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent{

  customersService = inject(CustomersService)

  customers: Customer[] = this.customersService.customers
  showCustomersDialog: boolean = false

  openCustomer(index: number) {
    this.customersService.selectedCustomer = this.customersService.customers[index]
    this.customersService.showCustomerDialog.update(value => !value)
  }


}