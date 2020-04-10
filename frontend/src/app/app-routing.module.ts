import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { AboutUsComponent } from './containers/about-us/about-us.component';
import { ProductsComponent } from './containers/products/products.component';
import { RecipesComponent } from './containers/recipes/recipes.component';
import { StoreComponent } from './containers/store/store.component';
import { SearchProductsComponent } from './containers/search-products/search-products.component';
import { AddProductsComponent } from './containers/add-products/add-products.component';
import { AddCategoriesComponent } from './containers/add-categories/add-categories.component';
import { AddStoresComponent } from './containers/add-stores/add-stores.component';
import { OrdersComponent } from './containers/orders/orders.component';
import { UsersComponent } from './containers/users/users.component';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { ProfileComponent } from './containers/profile/profile.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'aboutus', component: AboutUsComponent},
  {path: 'products', component: ProductsComponent}, // NO SE PLANTEA HACER VISTA
  {path: 'recipes', component: RecipesComponent},
  {path: 'store', component: StoreComponent},
  {path: 'products/search/:searchValue', component: SearchProductsComponent},
  {path: 'addproducts', component: AddProductsComponent},
  {path: 'addcategories', component: AddCategoriesComponent},
  {path: 'addstores', component: AddStoresComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'users', component: UsersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent} // NO SE PLANTEA HACER VISTA
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
