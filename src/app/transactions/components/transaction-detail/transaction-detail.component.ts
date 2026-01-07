import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { TransactionsService } from '../../services/transactions.service';
import { Dialog } from "primeng/dialog";

import { AddCustomerComponent } from './add-customer/add-customer.component';
import { Customer } from '../../../customers/models/customer.model';

@Component({
  selector: 'app-transaction-detail',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    FieldsetModule,
    ButtonModule,
    TextareaModule,
    Dialog,
    AddCustomerComponent
  ],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.css',
  animations: [
      trigger('fadeIn', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('800ms ease-out', style({ opacity: 1 }))
        ])
      ])
    ]
})
export class TransactionDetailComponent {

  transationService = inject(TransactionsService)
  router = inject(Router)
  route = inject(ActivatedRoute)

  createTransactionForm!: FormGroup

  selectedTransactionIndex: number = -1
  selectedTransaction: any | null = null

  customerSelected: boolean = false
  customerSelectionVisible: boolean = false

  constructor(private fb: FormBuilder) { 
    const id = this.route.snapshot.paramMap.get('id')

    this.selectedTransactionIndex = parseInt(id!, 10)
    this.selectedTransaction = this.transationService.transactions[this.selectedTransactionIndex]

    this.initForm(this.selectedTransaction)

    if (this.createTransactionForm.get('customerNumber')?.value != null) {
      this.customerSelected = true
    }
  }

  initForm(transaction: any | null = null) {
  
      this.createTransactionForm = this.fb.group({
        customerId: [transaction?.customer.id ?? null],
        customerNumber: [{ value: transaction?.customer.number ?? null, disabled: true }, [Validators.required]],
        customerName: [{ value: transaction?.customer.name ?? null, disabled: true }, [Validators.required]],
        customerStreet: [{ value: transaction?.customer.street ?? null, disabled: true }, [Validators.required]],
        customerPostcode: [{ value: transaction?.customer.postcode ?? null, disabled: true }, [Validators.required, Validators.pattern('^[0-9]{5}$')]],
        customerCity: [{ value: transaction?.customer.city ?? null, disabled: true }, [Validators.required]],
        description: [transaction?.description ?? null, [Validators.required, Validators.minLength(10)]],
        text: [transaction?.text ?? null]
      })
  
    }

  navigateToList() {
    this.router.navigate(['/vorgaenge'])
  }

  openCustomerSelection() {
    this.customerSelectionVisible = true
  }

  addCustomer(customer: Customer) {
    this.createTransactionForm.patchValue({
      customerId: customer.id,
      customerNumber: customer.number,
      customerName: customer.name,
      customerStreet: customer.street,
      customerPostcode: customer.postcode,
      customerCity: customer.city
    })
    this.customerSelectionVisible = false
  }
}