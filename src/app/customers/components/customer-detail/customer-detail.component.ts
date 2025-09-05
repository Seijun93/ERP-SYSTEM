import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';

import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-detail',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    FieldsetModule,
    ButtonModule,
    TextareaModule
  ],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent {

  customersService = inject(CustomersService)
  router = inject(Router)
  route = inject(ActivatedRoute)

  createCustomerForm!: FormGroup

  selectedCustomerIndex: number = -1
  selectedCustomer: Customer | null = null

  constructor(private fb: FormBuilder) {

    const id = this.route.snapshot.paramMap.get('id')

    this.selectedCustomerIndex = parseInt(id!, 10)
    this.selectedCustomer = this.customersService.customers[this.selectedCustomerIndex]

    this.initForm(this.selectedCustomer)
    
  }

  initForm(customer: Customer | null = null) {

    this.createCustomerForm = this.fb.group({
      number: [{ value: customer?.number ?? null, disabled: true }],
      name: [customer?.name ?? null, [Validators.required]],
      street: [customer?.street ?? null, [Validators.required]],
      postcode: [customer?.postcode ?? null, [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      city: [customer?.city ?? null, [Validators.required]],
      email: [customer?.email ?? null, [Validators.email]],
      phone: [customer?.phone ?? null, [Validators.pattern('^[0-9]*$')]],
      mobile: [customer?.mobile ?? null, [Validators.pattern('^[0-9]*$')]],
      text: [customer?.text ?? null]
    })

  }

  addCustomer(customer: Customer) {
    this.customersService.saveCustomer(customer)
    this.clearForm()
    this.router.navigate(['/kunden'])
  }

  clearForm() {
    this.selectedCustomer = null
    this.initForm(null)
  }

  navigateToList() {
    this.router.navigate(['/kunden'])
  }

}
