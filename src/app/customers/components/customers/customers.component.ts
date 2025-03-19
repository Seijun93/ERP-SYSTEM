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
  markedCells: any[] = []

  openCustomer(index: number) {
    this.customersService.selectedCustomer = this.customersService.customers[index]
    this.customersService.showCustomerDialog.update(value => !value)
  }

  toggleSelect(event: Event) {
    if (!(event instanceof KeyboardEvent)) {
      return; // Stellt sicher, dass es ein Keyboard-Event ist
    }
    const rowElement = (event.target as HTMLElement).closest('tr');
    if (rowElement) {
      rowElement.classList.toggle('bg-sky-800');
    }
  }

  toggleMark(event: MouseEvent) {
    const cell = event.target as HTMLElement

    if (this.markedCells.length > 0 && !event.ctrlKey) {
      for (const markedCell of this.markedCells) {
        markedCell.classList.toggle('bg-amber-500')
      }
      this.markedCells = []
    }
    this.markedCells.push(cell)
    cell.classList.toggle('bg-amber-500')
  }

}