import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { ProductsComponent } from './containers/products/products.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { AddProductsComponent } from './containers/add-products/add-products.component';
import { StoreComponent } from './containers/store/store.component';
import { AboutUsComponent } from './containers/about-us/about-us.component';
import { RecipesComponent } from './containers/recipes/recipes.component';
import { AddCategoriesComponent } from './containers/add-categories/add-categories.component';
import { SearchProductsComponent } from './containers/search-products/search-products.component';
import { HomeComponent } from './containers/home/home.component';
import { OrdersComponent } from './containers/orders/orders.component';
import { UsersComponent } from './containers/users/users.component';
import { AddStoresComponent } from './containers/add-stores/add-stores.component';
import { UserConfirmedComponent } from './containers/user-confirmed/user-confirmed.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    ProfileComponent,
    AddProductsComponent,
    StoreComponent,
    AboutUsComponent,
    RecipesComponent,
    AddCategoriesComponent,
    SearchProductsComponent,
    HomeComponent,
    OrdersComponent,
    UsersComponent,
    AddStoresComponent,
    UserConfirmedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
