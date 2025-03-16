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

  createCustomerForm: FormGroup;

  selectedCustomer: Customer | null = this.customersService.selectedCustomer

  constructor(private fb: FormBuilder) {

    this.createCustomerForm = this.fb.group({
      number: [ {value: this.selectedCustomer?.number, disabled: true} ],
      name: [ this.selectedCustomer?.name, [Validators.required] ],
      street: [ this.selectedCustomer?.street, [Validators.required] ],
      postcode: [ this.selectedCustomer?.postcode, [Validators.required, Validators.pattern('^[0-9]{5}$')] ],
      city: [ this.selectedCustomer?.city, [Validators.required] ],
      email: [ this.selectedCustomer?.email, [Validators.email] ],
      phone: [ this.selectedCustomer?.phone, [Validators.pattern('^[0-9]*$')] ],
      mobile: [ this.selectedCustomer?.mobile, [Validators.pattern('^[0-9]*$')] ],
      text: [ this.selectedCustomer?.text ]
    })
    
  }

  addCustomer(customer: Customer) {
    this.customersService.saveCustomer(customer)
    this.clearForm()
    this.customersService.toggleCustomerDialog()
  }

  clearForm() {
    this.createCustomerForm.reset()
  }

}
