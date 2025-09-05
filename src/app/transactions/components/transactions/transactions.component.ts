import { Component, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';

import { DataTableComponent } from "../../../core/framework/data-table/data-table.component";
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
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
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class TransactionsComponent {

  transactionsService = inject(TransactionsService)

  transactions: Transaction[] = this.transactionsService.transactions

  tablePropertys = [
    { label:'Vorgangsnummer', key:'transactionNumber', class:'min-w-50 w-50' },
    { label:'Status', key:'status', class:'min-w-50 w-50' },
    { label:'Kunde', key:'customer', class:'min-w-80 w-80' },
    { label:'Bezeichnung', key:'description', class:'min-w-160 w-1600' },
    { label:'Erstelldatum', key:'createDate', class:'min-w-40 w-40' },
    { label:'Änderungsdatum', key:'changeDate', class:'min-w-40 w-40' },
  ]

  openTransaction() {
    
  }

}
