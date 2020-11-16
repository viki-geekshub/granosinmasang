import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categories: object[];
  constructor(public httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/categories');
  }
  getCategories(): object[] {
    return this.categories;
  }
  setCategories(categories): void {
    this.categories = categories;
  }
  // getOne(id:string|number){
  //   return this.httpClient.get('http://localhost:3000/categories/' + id);
  // }
  getSubcategories(): object[] {
    return this.categories;
  }
  // setCatArroces(categories): void {
  //   this.categories =  categories;
  //   this.categories = this.categories.filter(item=>item['CategoryId']===1);
  // }
  // searchCategories(search) {
  //   return this.httpClient.get('http://localhost:3000/categories/name/' + search);
  // }
}
