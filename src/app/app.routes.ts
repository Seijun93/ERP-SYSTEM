import { Routes } from '@angular/router';
import { MasterDataComponent } from './master-data/components/master-data/master-data.component';
import { ProductsComponent } from './products/components/products/products.component';

export const routes: Routes = [
    { path: '', component: MasterDataComponent},
    { path: 'stammdaten', component: MasterDataComponent},
    { path: 'produkte', component: ProductsComponent},
];
