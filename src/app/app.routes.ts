import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/components/customers/customers.component';
import { ProductsComponent } from './products/components/products/products.component';
import { LoginComponent } from './core/components/login/login.component';
import { TransactionsComponent } from './transactions/components/transactions/transactions.component';
import { LayoutComponent } from './core/components/layout/layout.component';

import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
    //Main Routing
    { 
        path: '',
        component: LayoutComponent,
        canActivate:[authGuard],
        children: [
            { path: '', redirectTo: 'kunden', pathMatch: 'full'},
            { path: 'kunden', component: CustomersComponent, canActivate:[authGuard]},
            { path: 'produkte', component: ProductsComponent, canActivate:[authGuard]},
            { path: 'vorgaenge', component: TransactionsComponent, canActivate:[authGuard]},
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
