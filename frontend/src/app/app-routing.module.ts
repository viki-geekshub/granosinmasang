import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ProductsComponent } from './containers/products/products.component';
import { RecipesComponent } from './containers/recipes/recipes.component';
import { StoreComponent } from './containers/store/store.component';
import { SearchProductsComponent } from './containers/search-products/search-products.component';
import { ProductDetailsComponent } from './containers/product-details/product-details.component';
import { ShoppingCartComponent } from './containers/shopping-cart/shopping-cart.component';
import { AddProductsComponent } from './containers/add-products/add-products.component';
import { AddCategoriesComponent } from './containers/add-categories/add-categories.component';
import { AddStoresComponent } from './containers/add-stores/add-stores.component';
import { OrdersComponent } from './containers/orders/orders.component';
import { UsersComponent } from './containers/users/users.component';
import { RegisterComponent } from './containers/register/register.component';
import { UserConfirmedComponent } from './containers/user-confirmed/user-confirmed.component';
import { LoginComponent } from './containers/login/login.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { ArrocesComponent } from './containers/categories/arroces/arroces.component';
import { SemillasComponent } from './containers/categories/semillas/semillas.component';
import { CafeComponent } from './containers/categories/cafe/cafe.component';
import { ChocolateComponent } from './containers/categories/chocolate/chocolate.component';
import { EspeciasComponent } from './containers/categories/especias/especias.component';
import { SalesAzucaresComponent } from './containers/categories/sales-azucares/sales-azucares.component';
import { FrutasDeshidratadasComponent } from './containers/categories/frutas-deshidratadas/frutas-deshidratadas.component';
import { FrutosSecosComponent } from './containers/categories/frutos-secos/frutos-secos.component';
import { HarinasComponent } from './containers/categories/harinas/harinas.component';
import { CerealesComponent } from './containers/categories/cereales/cereales.component';
import { LegumbresComponent } from './containers/categories/legumbres/legumbres.component';
import { PastaComponent } from './containers/categories/pasta/pasta.component';
import { SemolasComponent } from './containers/categories/semolas/semolas.component';
import { SetasDeshidratadasComponent } from './containers/categories/setas-deshidratadas/setas-deshidratadas.component';
import { SuperalimentosPotenciadoresComponent } from './containers/categories/superalimentos-potenciadores/superalimentos-potenciadores.component';
import { TeFloresComponent } from './containers/categories/te-flores/te-flores.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'aboutus', component: AboutUsComponent},
  {path: 'products', component: ProductsComponent}, // NO ESTA PLANTEADO HACER VISTA
  {path: 'recipes', component: RecipesComponent},
  {path: 'store', component: StoreComponent},
  {path: 'products/search/:searchValue', component: SearchProductsComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'shoppingcart', component: ShoppingCartComponent},
  // ADMINISTRACION:
  {path: 'addproducts', component: AddProductsComponent},
  {path: 'addcategories', component: AddCategoriesComponent},
  {path: 'addstores', component: AddStoresComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'users', component: UsersComponent},
  // USUARIO:
  {path: 'signup', component: RegisterComponent},
  {path: 'userconfirmed/:token', component: UserConfirmedComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent}, // NO ESTA PLANTEADO HACER VISTA
  // CATEGORIAS:
  {path: 'Arroces', component: ArrocesComponent},
  {path: 'Semillas', component: SemillasComponent},
  {path: 'Café', component: CafeComponent},
  {path: 'Chocolate', component: ChocolateComponent},
  {path: 'Especias', component: EspeciasComponent},
  {path: 'Sales y Azúcares', component: SalesAzucaresComponent},
  {path: 'Frutas Deshidratadas', component: FrutasDeshidratadasComponent},
  {path: 'Frutos Secos', component: FrutosSecosComponent},
  {path: 'Harinas', component: HarinasComponent},
  {path: 'Cereales', component: CerealesComponent},
  {path: 'Legumbres', component: LegumbresComponent},
  {path: 'Pasta', component: PastaComponent},
  {path: 'Sémolas', component: SemolasComponent},
  {path: 'Setas Deshidratadas', component: SetasDeshidratadasComponent},
  {path: 'Superalimentos y Potenciadores', component: SuperalimentosPotenciadoresComponent},
  {path: 'Té y Flores Deshidratadas', component: TeFloresComponent},
  // NOT FOUND:
  {path: '**', component: NotFoundComponent} // ** Para que matchee todo se pone al final y con los dos asteriscos
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
