import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/components/customers/customers.component';
import { ProductsComponent } from './products/components/products/products.component';

export const routes: Routes = [
    { path: '', component: CustomersComponent},
    { path: 'kunden', component: CustomersComponent},
    { path: 'produkte', component: ProductsComponent},
];
