import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';

import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-create-customer',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    FieldsetModule,
    ButtonModule,
    TextareaModule
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent {

  customersService = inject(CustomersService)

  createCustomerForm!: FormGroup;

  selectedCustomer: Customer | null = this.customersService.selectedCustomer

  constructor(private fb: FormBuilder) {

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
    this.customersService.toggleCustomerDialog()
  }

  clearForm() {
    this.selectedCustomer = null
    this.initForm(null)
  }

}
