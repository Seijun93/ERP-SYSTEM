import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/components/customers/customers.component';
import { ProductsComponent } from './products/components/products/products.component';
import { LoginComponent } from './core/components/login/login.component';

export const routes: Routes = [
    { path: '', component: CustomersComponent},
    { path: 'kunden', component: CustomersComponent},
    { path: 'produkte', component: ProductsComponent},
    { path: 'login', component: LoginComponent}
];
