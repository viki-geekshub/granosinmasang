import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public products: object[];
  public arroces: object[];
  constructor(public httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/products');
  }
  getOne(id:string|number) {
    return this.httpClient.get('http://localhost:3000/products/' + id);
  }
  searchProducts(search) {
    return this.httpClient.get('http://localhost:3000/products/name/' + search);
  }
  getProducts(): object[] {
    return this.products;
  }
  setProducts(products): void {
    this.products = products;
  }

  //FILTROS POR CATEGORIAS Y SUBCATEGORIAS
  setProductsArroces(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1 || item['SubcategoryId']===2);
  }
  setProductsArrocesBlanco(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1);
  }
  setProductsArrocesIntegral(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===2);
  }
  /////////////////////
  setProductsSemillas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===3);
  }
  //////////////////
  setProductsCafes(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']>3 && item['SubcategoryId']<7);
  }
  setProductsCafesNatural(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===4);
  }
  setProductsCafesTorrefacto(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===5);
  }
  setProductsCafesDescafeinado(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===6);
  }
  ///////////////////
  setProductsChocolates(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===7);
  }
  //////////////////
  setProductsEspecias(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===8);
  }
  //////////////////
  setProductsSalesAzucares(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===9 || item['SubcategoryId']===10);
  }
  setProductsSalesAzucaresSal(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===9);
  }
  setProductsSalesAzucaresAzucar(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===10);
  }
  //////////////////
  setProductsFrutasDeshidratadas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===11 || item['SubcategoryId']===12);
  }
  setProductsFrutasDeshidratadasConAzucar(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===11);
  }
  setProductsFrutasDeshidratadasSinAzucar(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===12);
  }
  //////////////////
  setProductsFrutosSecos(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']>12 && item['SubcategoryId']<21);
  }
  setProductsFrutosSecosAlmendras(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===13);
  }
  setProductsFrutosSecosAnacardos(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===14);
  }
  setProductsFrutosSecosAvellanas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===15);
  }
  setProductsFrutosSecosCacahuetes(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===16);
  }
  setProductsFrutosSecosCastañas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===17);
  }
  setProductsFrutosSecosNueces(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===18);
  }
  setProductsFrutosSecosPipas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===19);
  }
  setProductsFrutosSecosOtros(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===20);
  }
  //////////////////
  setProductsHarinas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===21 || item['SubcategoryId']===22);
  }
  setProductsHarinasConGluten(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===21);
  }
  setProductsHarinasSinGluten(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===22);
  }
  //////////////////
  setProductsCereales(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===23);
  }
  //////////////////
  setProductsLegumbres(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']>23 && item['SubcategoryId']<28); 
  }
  setProductsLegumbresAlubias(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===24); 
  }
  setProductsLegumbresGarbanzos(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===25); 
  }
  setProductsLegumbresLentejas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===26); 
  }
  setProductsLegumbresOtros(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===27); 
  }
  //////////////////
  setProductsPastas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===28 || item['SubcategoryId']===29);
  }
  setProductsPastasConGluten(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===28);
  }
  setProductsPastasSinGluten(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===29);
  }
  //////////////////
  setProductsSemolas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===30);
  }
  //////////////////
  setProductsSetasDeshidratadas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===31);
  }
  //////////////////
  setProductsSuperalimentosPotenciadores(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===32 || item['SubcategoryId']===33);
  }
  setProductsSuperalimentosPotenciadoresSuperalimentos(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===32);
  }
  setProductsSuperalimentosPotenciadoresPotenciadores(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===33);
  }
  //////////////////
  setProductsTesFlores(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']>33 && item['SubcategoryId']<41);
  }
  setProductsTesFloresNegro(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===34);
  }
  setProductsTesFloresVerde(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===35);
  }
  setProductsTesFloresRooibos(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===36);
  }
  setProductsTesFloresMezclas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===37);
  }
  setProductsTesFloresInfusiones(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===38);
  }
  setProductsTesFloresFlores(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===39);
  }
  setProductsTesFloresComplementos(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===40);
  }
  //////////////////
}
