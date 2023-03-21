import { FormProductComponent } from './components/products/form-product/form-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './components/products/list-product/list-product.component';
import { HomeProductComponent } from './components/products/home-product/home-product.component';
import { ListCategoryComponent } from './components/Categorys/list-category/list-category.component';
import { FormCategoryComponent } from './components/Categorys/form-category/form-category.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { CartViewComponent } from './components/products/cart-view/cart-view.component';
import { AuthGuard } from './Utils/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeProductComponent,
  },
  {
    path: 'products',
    component: ListProductComponent,canActivate:[AuthGuard],
  },
  {
    path: 'products-form',
    component: FormProductComponent,canActivate:[AuthGuard],
  },
  {
    path: 'categorys',
    component: ListCategoryComponent,canActivate:[AuthGuard],
  },
  {
    path: 'categorys-form',
    component: FormCategoryComponent,canActivate:[AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,canActivate:[AuthGuard],
  },
  {
    path: 'cart-view',
    component: CartViewComponent,canActivate:[AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
