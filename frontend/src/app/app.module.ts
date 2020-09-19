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
import { LegumbresComponent } from './containers/categories/legumbres/legumbres.component';
import { ArrocesComponent } from './containers/categories/arroces/arroces.component';
import { HarinasComponent } from './containers/categories/harinas/harinas.component';
import { PastaComponent } from './containers/categories/pasta/pasta.component';
import { SemolasComponent } from './containers/categories/semolas/semolas.component';
import { SemillasComponent } from './containers/categories/semillas/semillas.component';
import { FrutosSecosComponent } from './containers/categories/frutos-secos/frutos-secos.component';
import { AlimentosDeshidratadosComponent } from './containers/categories/alimentos-deshidratados/alimentos-deshidratados';
import { SuperAlimentosComponent } from './containers/categories/super-alimentos/super-alimentos.component';
import { CerealesComponent } from './containers/categories/cereales/cereales.component';
import { CafeComponent } from './containers/categories/cafe/cafe.component';
import { CacaoComponent } from './containers/categories/cacao/cacao.component';
import { TeComponent } from './containers/categories/te/te.component';
import { PotenciadoresCocinaComponent } from './containers/categories/potenciadores-cocina/potenciadores-cocina.component';
import { EspeciasComponent } from './containers/categories/especias/especias.component';
import { SortPipe } from './pipes/sort.pipe';
import { DatePipe } from './pipes/date.pipe';
import { ProductDetailsComponent } from './containers/product-details/product-details.component';
import { ShoppingCartComponent } from './containers/shopping-cart/shopping-cart.component';
// import { StickyHeaderDirective } from './sticky-header.directive';
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
    LegumbresComponent,
    ArrocesComponent,
    HarinasComponent,
    PastaComponent,
    SemolasComponent,
    SemillasComponent,
    FrutosSecosComponent,
    AlimentosDeshidratadosComponent,
    SuperAlimentosComponent,
    CerealesComponent,
    CafeComponent,
    CacaoComponent,
    TeComponent,
    PotenciadoresCocinaComponent,
    EspeciasComponent,
    SortPipe,
    DatePipe,
    ProductDetailsComponent,
    ShoppingCartComponent,
    // StickyHeaderDirective,
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
