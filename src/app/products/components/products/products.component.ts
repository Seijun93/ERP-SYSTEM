import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { DataTableComponent } from "../../../core/framework/data-table/data-table.component";
import { CreateProductComponent } from "../create-product/create-product.component";
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';



@Component({
  selector: 'app-products',
  imports: [
    ButtonModule,
    TableModule,
    DialogModule,
    DataTableComponent,
    CreateProductComponent
],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  
  productsService = inject(ProductsService)

  products: Product[] = this.productsService.products
  
  tablePropertys = [
    {label: 'Artikelnummer', key: 'articleNumber', class: 'min-w-40 w-40'},
    {label: 'Produktname', key: 'name', class: 'min-w-60 w-60'},
    {label: 'Kathegorie', key: 'cathegory', class: 'min-w-80 w-80'},
    {label: 'Verkaufspreis', key: 'sellPrice', class: 'min-w-40 w-40', pipe: "currency:'EUR':'symbol':'1.2-2':'de'"}
  ]

  openProduct(index: number) {
    this.productsService.selectedProduct = this.productsService.products[index]
    this.productsService.showProductsDialog.update(value => !value)
  }

}
