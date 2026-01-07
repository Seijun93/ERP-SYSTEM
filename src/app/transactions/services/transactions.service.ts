import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  http = inject(HttpClient)
  router = inject(Router)

  constructor() {  }

  transactions: Transaction[] = [
    {
      transactionNumber: 'VO-10001',
      status: 'Erstellt',
      customer: {
        id: '',
        name: 'Mustermann',
        number: '2',
        street: 'Musterstraße 1',
        postcode: '12345',
        city: 'Musterstadt'
      },
      description: 'Das ist ein erster Testvorgang um die Darstellung der Data-Table zu testen',
      createDate: '09.05.2025',
      changeDate: '10.05.2025',
      history: [
        {date: '09.05.2025', action: 'Vorgang erstellt', actionType: 'createTransaction', actionId: ''},
        {date: '10.05.2025', action: 'Angebot erstellt', actionType: 'offer', actionLinkId: ''},
      ]
    },
    {
      transactionNumber: 'VO-10002',
      status: 'Erstellt',
      customer: {
        id: '',
        name: 'Testkunde',
        number: '2',
        street: 'Testweg 5',
        postcode: '54321',
        city: 'Teststadt'
      },
      description: 'Das ist ein zweiter Testvorgang um die Darstellung der Data-Table zu testen',
      createDate: '10.05.2025',
      changeDate: '11.05.2025',
      history: [
        {date: '10.05.2025', action: 'Vorgang erstellt', actionType: 'createTransaction', actionId: ''},
        {date: '11.05.2025', action: 'Angebot erstellt', actionType: 'offer', actionLinkId: ''},
      ]
    },
  ]

  selectedTransaction: any | null = null

  addTransaction() {
    this.selectedTransaction = null
    this.router.navigate(['/vorgaenge/anlegen'])
  }
}
