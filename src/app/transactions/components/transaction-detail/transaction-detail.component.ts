import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';

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

}
