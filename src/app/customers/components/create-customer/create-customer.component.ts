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

  constructor(private fb: FormBuilder) {

    this.createCustomerForm = this.fb.group({
      id: [ {value:'', disabled: true} ],
      name: [ '', [Validators.required] ],
      street: [ '', [Validators.required] ],
      postcode: [ '', [Validators.required, Validators.pattern('^[0-9]{5}$')] ],
      city: [ '', [Validators.required] ],
      email: [ '', [Validators.email] ],
      phone: [ '', [Validators.pattern('^[0-9]*$')] ],
      mobile: [ '', [Validators.pattern('^[0-9]*$')] ],
      text: [ '' ]
    })

  }

  addCustomer(customer: Customer) {
    this.customersService.addCustomer(customer)
    this.clearForm()
    this.customersService.toggleCustomerDialog()
  }

  clearForm() {
    this.createCustomerForm.reset()
  }

}
