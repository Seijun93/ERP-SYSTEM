import { Injectable, signal } from '@angular/core';

import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor() { }

  transactions: Transaction[] = [
    {
      transactionNumber: 'VO-10001',
      status: 'Erstellt',
      customer: 'Mustermann',
      customerId: '',
      description: 'Das ist ein erster Testvorgang um die Darstellung der Data-Table zu testen',
      createDate: '09.05.2025',
      changeDate: '09.05.2025'
    },
    {
      transactionNumber: 'VO-10002',
      status: 'Erstellt',
      customer: 'Mustermann',
      customerId: '',
      description: 'Das ist ein zweiter Testvorgang um die Darstellung der Data-Table zu testen',
      createDate: '09.05.2025',
      changeDate: '09.05.2025'
    },
  ]

  selectedTransaction: any | null = null

  showTransactionsDialog = signal(false)

  toggleTransactionDialog() {
    this.showTransactionsDialog.update(value => !value)
  }

  addTransaction() {
    this.selectedTransaction = null
    this.toggleTransactionDialog()
  }
}
