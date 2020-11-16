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
  setProductsArroces(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1 || item['SubcategoryId']===2);
  }
  setProductsSemillas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===3);
  }
  setProductsCafes(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']>3 && item['SubcategoryId']<7);
  }
  setProductsChocolates(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===7);
  }
  setProductsEspecias(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===8);
  }
  setProductsSalesAzucares(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===9 || item['SubcategoryId']===10);
  }
  setProductsFrutasDeshidratadas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===11 || item['SubcategoryId']===12);
  }
  setProductsFrutosSecos(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']>12 && item['SubcategoryId']<19);
  }
  setProductsHarinas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===19 || item['SubcategoryId']===20);
  }
  setProductsCereales(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===21);
  }
  setProductsLegumbres(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']>21 && item['SubcategoryId']<26); 
  }
  setProductsPastas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===26 || item['SubcategoryId']===27);
  }
  setProductsSemolas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===28);
  }
  setProductsSetasDeshidratadas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===29);
  }
  setProductsSuperalimentosPotenciadores(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===30 || item['SubcategoryId']===31);
  }
  setProductsTesFlores(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']>31 && item['SubcategoryId']<39);
  }

}
