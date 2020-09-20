import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesHomeService {
  public categories: object[];
  constructor(public httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/categories');
  }
  getOne(id:string|number){
    return this.httpClient.get('http://localhost:3000/categories/' + id);
  }
  setCategories(categories): void {
    this.categories = categories;
  }
  getCategories(): object[] {
    return this.categories;
  }
}
