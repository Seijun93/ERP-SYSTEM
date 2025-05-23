import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  http = inject(HttpClient)

  constructor() {
    this.readProducts()
  }

  products: Product[] = []

  selectedProduct: Product | null = null

  showProductsDialog = signal(false);

  toggleProductDialog () {
    this.showProductsDialog.update(value => !value)
  }

  addProductDialog () {
    this.selectedProduct = null
    this.toggleProductDialog()
  }

  saveProduct (product: Product) {
    console.log(product.id)
    if (product.articleNumber !== null) {
      //Update Product
      console.log('update',product)
      this.updateProduct(product)
    }
    else {
      //Add new Product
      if (this.products.length === 0 || this.products.length === undefined) {
        product.articleNumber = 1
      }
      else {
        const articleNumber = Math.max(...this.products.map(product => product.articleNumber)) + 1
        product.articleNumber = articleNumber
      }
      this.createProduct(product)
    }
  }

  //CRUD Funktionen

  //Create Funktion
  createProduct(productData: Product) {
    this.http.post<{ name: string }>(
      'https://erp-system-e5e14-default-rtdb.europe-west1.firebasedatabase.app/products.json',
      productData
    ).subscribe(resData => {
      productData.id = resData.name
      this.products.push(productData)
    })
  }

  //Read Funktion
  private readProducts() {
    this.http
      .get<{[key: string]: Product }>('https://erp-system-e5e14-default-rtdb.europe-west1.firebasedatabase.app/products.json')
      .pipe(map(resData => {
        const productsArray: Product[] = []
        for (const key in resData) {
          if (Object.prototype.hasOwnProperty.call(resData, key)) {
            productsArray.push({ ...resData[key], id:(key)})
          }
        }
        return productsArray
      }))
      .subscribe(products => {
        for (const product of products) {
          this.products.push(product)
        }
    })
  }

  //Update Funktion
  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex(c => c.articleNumber === updatedProduct.articleNumber)
    updatedProduct.id = this.products[index].id

    if (updatedProduct === null || !updatedProduct.id) {
      console.log('crash', updatedProduct, !updatedProduct.id)
      return
    }

    this.http.patch(
      `https://erp-system-e5e14-default-rtdb.europe-west1.firebasedatabase.app/products/${updatedProduct.id}.json`,
      updatedProduct
    ).subscribe(() => {
      console.log('update gesendet')
      if (index !== -1) {
        this.products[index] = updatedProduct!
      }
    })

  }

  //Delete Funktion
  deleteProduct() {
    if (this.selectedProduct === null || this.selectedProduct.id === null) {
      return
    }
    this.http.delete(`https://erp-system-e5e14-default-rtdb.europe-west1.firebasedatabase.app/products/${this.selectedProduct.id}.json`)
    .subscribe(() => {
      const deletedIndex = this.products.findIndex(c => c.id === this.selectedProduct!.id)
      if (deletedIndex !== -1) {
        this.products.splice(deletedIndex, 1)
      }

      this.selectedProduct = null
      this.toggleProductDialog()
    },error => {
      console.error('❌ Fehler beim Löschen des Kunden:', error)
      alert('❌ Fehler beim Löschen des Kunden')
    })
  }

}
