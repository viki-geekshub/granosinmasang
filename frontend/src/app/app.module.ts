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
import { AboutUsComponent } from './components/about-us/about-us.component';
import { RecipesComponent } from './containers/recipes/recipes.component';
import { AddCategoriesComponent } from './containers/add-categories/add-categories.component';
import { SearchProductsComponent } from './containers/search-products/search-products.component';
import { HomeComponent } from './containers/home/home.component';
import { OrdersComponent } from './containers/orders/orders.component';
import { UsersComponent } from './containers/users/users.component';
import { AddStoresComponent } from './containers/add-stores/add-stores.component';
import { UserConfirmedComponent } from './containers/user-confirmed/user-confirmed.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ArrocesComponent } from './containers/categories/arroces/arroces.component';
import { SemillasComponent } from './containers/categories/semillas/semillas.component';
import { CafeComponent } from './containers/categories/cafe/cafe.component';
import { ChocolateComponent } from './containers/categories/chocolate/chocolate.component';
import { EspeciasComponent } from './containers/categories/especias/especias.component';
import { SalAzucarComponent } from './containers/categories/sal-azucar/sal-azucar.component';
import { FrutasDeshidratadasComponent } from './containers/categories/frutas-deshidratadas/frutas-deshidratadas.component';
import { FrutosSecosComponent } from './containers/categories/frutos-secos/frutos-secos.component';
import { HarinasComponent } from './containers/categories/harinas/harinas.component';
import { CerealesComponent } from './containers/categories/cereales/cereales.component';
import { LegumbresComponent } from './containers/categories/legumbres/legumbres.component';
import { PastaComponent } from './containers/categories/pasta/pasta.component';
import { SemolasComponent } from './containers/categories/semolas/semolas.component';
import { SetasDeshidratadasComponent } from './containers/categories/setas-deshidratadas/setas-deshidratadas.component';
// tslint:disable-next-line:max-line-length
import { SuperalimentosPotenciadoresComponent } from './containers/categories/superalimentos-potenciadores/superalimentos-potenciadores.component';
import { TeFloresComponent } from './containers/categories/te-flores/te-flores.component';
import { SortPipe } from './pipes/sort.pipe';
import { DatePipe } from './pipes/date.pipe';
import { ProductDetailsComponent } from './containers/product-details/product-details.component';
import { ShoppingCartComponent } from './containers/shopping-cart/shopping-cart.component';
import { CategoriesHomeComponent } from './components/categories-home/categories-home.component';
import { StickyHeaderDirective } from './sticky-header.directive';
import { FiltersComponent } from './components/filters/filters.component';
import { StoreHomeComponent } from './components/store-home/store-home.component';
// import { DatePipe } from '@angular/common';


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
    NotFoundComponent,
    ArrocesComponent,
    SemillasComponent,
    CafeComponent,
    ChocolateComponent,
    EspeciasComponent,
    SalAzucarComponent,
    FrutasDeshidratadasComponent,
    FrutosSecosComponent,
    HarinasComponent,
    CerealesComponent,
    LegumbresComponent,
    PastaComponent,
    SemolasComponent,
    SetasDeshidratadasComponent,
    SuperalimentosPotenciadoresComponent,
    TeFloresComponent,
    SortPipe,
    DatePipe,
    ProductDetailsComponent,
    ShoppingCartComponent,
    CategoriesHomeComponent,
    StickyHeaderDirective,
    FiltersComponent,
    StoreHomeComponent,
    // DatePipe, // Al final no uso elmodulo de date de angular, me hice uno propio
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
