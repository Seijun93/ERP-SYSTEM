import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';

import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    FieldsetModule,
    ButtonModule,
    TextareaModule,
    InputNumberModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  productsService = inject(ProductsService)
  router = inject(Router)
  route = inject(ActivatedRoute)

  createProductForm!: FormGroup

  selectedProductIndex: number = -1
  selectedProduct: Product | null = null

  constructor(private fb: FormBuilder) {

    const id = this.route.snapshot.paramMap.get('id')

    this.selectedProductIndex = parseInt(id!, 10)
    this.selectedProduct = this.productsService.products[this.selectedProductIndex]

    this.initForm(this.selectedProduct)

  }

  initForm(product: Product | null = null) {

    this.createProductForm = this.fb.group({
      articleNumber: [{ value: product?.articleNumber ?? null, disabled: true }],
      name: [product?.name ?? null, [Validators.required]],
      cathegory: [product?.cathegory ?? null, [Validators.required]],
      sellPrice: [product?.sellPrice ?? null, [Validators.required]]
    })

  }

  addProduct(product: Product) {
    this.productsService.saveProduct(product)
    this.clearForm()
    this.router.navigate(['/produkte'])
  }

  clearForm() {
    this.selectedProduct = null
    this.initForm(null)
  }

  navigateToList() {
    this.router.navigate(['/produkte'])
  }

}
