import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { TransactionsService } from '../../services/transactions.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-detail',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    FieldsetModule,
    ButtonModule,
    TextareaModule
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

  constructor(private fb: FormBuilder) { 
    const id = this.route.snapshot.paramMap.get('id')

    this.selectedTransactionIndex = parseInt(id!, 10)
    this.selectedTransaction = this.transationService.transactions[this.selectedTransactionIndex]


  }

  initForm(transaction: any | null = null) {
  
      this.createTransactionForm = this.fb.group({
        number: [{ value: transaction?.transactionNumber ?? null, disabled: true }],
        name: [transaction?.name ?? null, [Validators.required]],
        street: [transaction?.street ?? null, [Validators.required]],
        postcode: [transaction?.postcode ?? null, [Validators.required, Validators.pattern('^[0-9]{5}$')]],
        city: [transaction?.city ?? null, [Validators.required]],
        email: [transaction?.email ?? null, [Validators.email]],
        phone: [transaction?.phone ?? null, [Validators.pattern('^[0-9]*$')]],
        mobile: [transaction?.mobile ?? null, [Validators.pattern('^[0-9]*$')]],
        text: [transaction?.text ?? null]
      })
  
    }

}
