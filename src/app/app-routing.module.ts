import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './modules/product-details/product-details.component';
import { ProductsComponent } from './modules/products/products.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'product/detail/:id',
    component: ProductDetailsComponent,
  },
  {
    path: '',
    redirectTo: "/products",
    pathMatch: "full"
  },
  {
    path: '**',
    redirectTo: "/products"
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
