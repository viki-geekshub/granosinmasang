import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { AboutUsComponent } from './containers/about-us/about-us.component';
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
import { LegumbresComponent } from './containers/categories/legumbres/legumbres.component';
import { ArrocesComponent } from './containers/categories/arroces/arroces.component';
import { HarinasComponent } from './containers/categories/harinas/harinas.component';
import { SemolasComponent } from './containers/categories/semolas/semolas.component';
import { PastaComponent } from './containers/categories/pasta/pasta.component';
import { CerealesComponent } from './containers/categories/cereales/cereales.component';
import { FrutosSecosComponent } from './containers/categories/frutos-secos/frutos-secos.component';
import { AlimentosDeshidratadosComponent } from './containers/categories/alimentos-deshidratados/alimentos-deshidratados';
import { EspeciasComponent } from './containers/categories/especias/especias.component';
import { PotenciadoresCocinaComponent } from './containers/categories/potenciadores-cocina/potenciadores-cocina.component';
import { CafeComponent } from './containers/categories/cafe/cafe.component';
import { CacaoComponent } from './containers/categories/cacao/cacao.component';
import { SemillasComponent } from './containers/categories/semillas/semillas.component';
import { SuperAlimentosComponent } from './containers/categories/super-alimentos/super-alimentos.component';
import { TeComponent } from './containers/categories/te/te.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'aboutus', component: AboutUsComponent},
  {path: 'products', component: ProductsComponent}, // NO ESTA PLANTEADO HACER VISTA
  {path: 'recipes', component: RecipesComponent},
  {path: 'store', component: StoreComponent},
  {path: 'products/search/:searchValue', component: SearchProductsComponent},
  {path:'product/:id', component: ProductDetailsComponent},
  {path:'shoppingcart',component: ShoppingCartComponent},
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
  {path: 'Legumbres', component: LegumbresComponent},
  {path: 'Arroces', component: ArrocesComponent},
  {path: 'Harinas', component: HarinasComponent},
  {path: 'Sémolas', component: SemolasComponent},
  {path: 'Pasta', component: PastaComponent},
  {path: 'Cereales', component: CerealesComponent},
  {path: 'Frutos Secos', component: FrutosSecosComponent},
  {path: 'Alimentos Deshidratados', component: AlimentosDeshidratadosComponent},
  {path: 'Especias', component: EspeciasComponent},
  {path: 'Potenciadores de Cocina', component: PotenciadoresCocinaComponent},
  {path: 'Café', component: CafeComponent},
  {path: 'Cacao', component: CacaoComponent},  
  {path: 'Semillas', component: SemillasComponent},
  {path: 'Superalimentos', component: SuperAlimentosComponent},
  {path: 'Té', component: TeComponent},
  // NOT FOUND:
  {path: '**', component: NotFoundComponent} // ** Para que matchee todo se pone al final y con los dos asteriscos
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
