import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public products: object[];
  constructor(public httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/products');
  }
  getOne(id:string|number) {
    return this.httpClient.get('http://localhost:3000/products/' + id);
  }
  setProducts(products): void {
    this.products = products;
  }
  getProducts(): object[] {
    return this.products;
  }
  searchProducts(search) {
    return this.httpClient.get('http://localhost:3000/products/name/' + search);
  }
  setProductsLegumbres(products): void {
    this.products = products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1 || item['SubcategoryId']===2 || item['SubcategoryId']===3 || item['SubcategoryId']===4);
  }
  setProductsArroces(products): void {
    this.products = products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1);
  }
  setProductsAlimentosDeshidratados(products): void {
    this.products = products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1);
  }
  setProductsCacao(products): void {
    this.products = products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1);
  }
  setProductsCafe(products): void {
    this.products = products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1);
  }
  setProductsCereales(products): void {
    this.products = products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1);
  }
  setProductsEspecias(products): void {
    this.products = products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1);
  }
  setProductsFrutosSecos(products): void {
    this.products = products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1);
  }
  setProductsHarinas(products): void {
    this.products = products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1);
  }
  setProductsPasta(products): void {
    this.products = products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1);
  }
  setProductsPotenciadoresCocina(products): void {
    this.products = products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1);
  }
  setProductsSemillas(products): void {
    this.products = products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1);
  }
  setProductsSemolas(products): void {
    this.products = products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1);
  }
  setProductsSuperAlimentos(products): void {
    this.products = products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1);
  }
  setProductsTe(products): void {
    this.products = products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1);
  }
}
