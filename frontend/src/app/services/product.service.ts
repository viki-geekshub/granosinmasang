import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public products: object[];
  public arroces: object[];
  // private arroces: object[];
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
  // getProducts(): object[] {
  //   return this.products;
  // }
  searchProducts(search) {
    return this.httpClient.get('http://localhost:3000/products/name/' + search);
  }
  setProductsArroces(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===1);
  }
  setProductsSemillas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===2);
  }
  setProductsCafe(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===3);
  }
  setProductsChocolates(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===4);
  }
  setProductsEspecias(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===5);
  }
  setProductsSales(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===6);
  }
  setProductsFrutasDeshidratadas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===7);
  }
  setProductsFrutosSecos(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===8);
  }
  setProductsHarinas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===9 || item['SubcategoryId']===10 );
  }
  setProductsCereales(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===11);
  }
  setProductsLegumbres(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']>11 && item['SubcategoryId']<16); 
  }
  setProductsPastas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===16 || item['SubcategoryId']===17);
  }
  setProductsSemolas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===18);
  }
  setProductsSetasDeshidratadas(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===19);
  }
  setProductsSuperalimentos(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===20);
  }
  setProductsTes(products): void {
    this.products =  products;
    this.products = this.products.filter(item=>item['SubcategoryId']===21);
  }

}
