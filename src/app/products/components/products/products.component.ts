import { Component, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';

import { DataTableComponent } from "../../../core/framework/data-table/data-table.component";
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
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
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ProductsComponent {
  
  productsService = inject(ProductsService)
  router = inject(Router)

  products: Product[] = this.productsService.products
  
  tablePropertys = [
    {label: 'Artikelnummer', key: 'articleNumber', class: 'min-w-40 w-40'},
    {label: 'Produktname', key: 'name', class: 'min-w-60 w-60'},
    {label: 'Kathegorie', key: 'cathegory', class: 'min-w-80 w-80'},
    {label: 'Verkaufspreis', key: 'sellPrice', class: 'min-w-40 w-40', pipe: "currency:'EUR':'symbol':'1.2-2':'de'"}
  ]

  openProduct(index: number) {
    this.router.navigate(['/produkte/' + index])
  }

}
