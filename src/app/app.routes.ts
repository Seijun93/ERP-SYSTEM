import { Routes } from '@angular/router';

import { CustomersComponent } from './customers/components/customers/customers.component';
import { ProductsComponent } from './products/components/products/products.component';
import { LoginComponent } from './core/components/login/login.component';
import { TransactionsComponent } from './transactions/components/transactions/transactions.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { ProductDetailComponent } from './products/components/product-detail/product-detail.component';
import { TransactionDetailComponent } from './transactions/components/transaction-detail/transaction-detail.component';
import { CustomerDetailComponent } from './customers/components/customer-detail/customer-detail.component';

import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';
import { numericIdGuard } from './core/guards/numeric-id.guard';

export const routes: Routes = [
    //Main Routing
    { 
        path: '',
        component: LayoutComponent,
        canActivate:[authGuard],
        children: [
            { path: '', redirectTo: 'kunden', pathMatch: 'full'},

            { path: 'kunden', canActivate:[authGuard], children: [
                { path: '', component: CustomersComponent},
                { path: 'anlegen', component: CustomerDetailComponent},
                { path: ':id', component: CustomerDetailComponent, canActivate: [numericIdGuard]},
            ]},

            { path: 'produkte', canActivate:[authGuard], children: [
                { path: '', component: ProductsComponent},
                { path: 'anlegen', component: ProductDetailComponent},
                { path: ':id', component: ProductDetailComponent, canActivate: [numericIdGuard]},
            ]},

            { path: 'vorgaenge', canActivate:[authGuard], children: [
                { path: '', component: TransactionsComponent},
                { path: 'anlegen', component: TransactionDetailComponent},
                { path: ':id', component: TransactionDetailComponent, canActivate: [numericIdGuard]},
            ]}
        ]
    },
    //Login Routing
    {
        path: 'login',
        component: LoginComponent,
        canActivate:[loginGuard],
    },
    { 
        path: '**', redirectTo: 'kunden'
    }
];
