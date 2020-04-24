import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: object[];
  constructor(public httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/categories');
  }
  setSubcategories(categories): void {
    this.categories =  categories;
    this.categories = this.categories.filter(item=>item['CategoryId']===1);
  }
  getSubcategories(): object[] {
    return this.categories;
  }
  // searchCategories(search) {
  //   return this.httpClient.get('http://localhost:3000/categories/name/' + search);
  // }
}
