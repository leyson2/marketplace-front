import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormProductComponent } from './components/products/form-product/form-product.component';
import { ListProductComponent } from './components/products/list-product/list-product.component';
import { HomeProductComponent } from './components/products/home-product/home-product.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import { TokenInterceptor } from './Utils/token.interceptor';
import { ListCategoryComponent } from './components/Categorys/list-category/list-category.component';
import { FormCategoryComponent } from './components/Categorys/form-category/form-category.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProfileComponent } from './components/users/profile/profile.component';
import { CartViewComponent } from './components/products/cart-view/cart-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormProductComponent,
    ListProductComponent,
    HomeProductComponent,
    LoginComponent,
    ListCategoryComponent,
    FormCategoryComponent,
    ProfileComponent,
    CartViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
   
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
