import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';

import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-create-product',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    FieldsetModule,
    ButtonModule,
    TextareaModule,
    InputNumberModule,
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {

  productsService = inject(ProductsService)

  createProductForm!: FormGroup

  selectedProduct: Product | null = this.productsService.selectedProduct

  constructor(private fb: FormBuilder) {

    this.initForm(this.selectedProduct)

  }

  initForm(product: Product | null = null) {

    this.createProductForm = this.fb.group({
      productId: [{ value: product?.productId ?? null, disabled: true }],
      name: [product?.name ?? null, [Validators.required]],
      cathegory: [product?.cathegory ?? null, [Validators.required]],
      sellPrice: [product?.sellPrice ?? null, [Validators.required]]
    })

  }

  addProduct(product: Product) {
    this.productsService.saveProduct(product)
    this.clearForm()
    this.productsService.toggleProductDialog()
  }

  clearForm() {
    this.selectedProduct = null
    this.initForm(null)
  }

}
