import { FormProductComponent } from './components/products/form-product/form-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './components/products/list-product/list-product.component';
import { HomeProductComponent } from './components/products/home-product/home-product.component';

const routes: Routes = [
  {
    path: '',
    component: HomeProductComponent
  },
  {
    path: 'products',
    component: ListProductComponent
  },
  {
    path: 'products-form',
    component: FormProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
