import { Component, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';

import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer.model';
import { DataTableComponent } from '../../../core/framework/data-table/data-table.component';

@Component({
  selector: 'app-customers',
  imports: [
    ButtonModule,
    TableModule,
    DialogModule,
    DataTableComponent,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    SplitButtonModule
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 }))
      ]),
    ]),
  ]
})
export class CustomersComponent {

  customersService = inject(CustomersService)
  router = inject(Router)

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
    console.log(index)
    this.router.navigate(['/kunden/' + index])
  }

}