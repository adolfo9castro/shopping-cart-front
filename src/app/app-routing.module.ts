import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCarComponent } from './components/shopping-car/shopping-car.component';

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
    path:'shopping-car',
    component: ShoppingCarComponent
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
