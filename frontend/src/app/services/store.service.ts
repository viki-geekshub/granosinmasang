import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {  // Lo pongo publico aunque por buenas prácticas tendría que ser privado y acceder a ello por los getter y setter. Lo pongo public para facilitarme el acceso en otras partes del código
  public stores: object[];
  private token: string;
  constructor(public httpClient: HttpClient) { }

  getAll(): Observable<any> {
    this.token = localStorage.getItem('authToken');
    return this.httpClient.get('http://localhost:3000/stores', {headers: {Authorization: this.token}});
  }
  setStores(stores): void {
    this.stores = stores;
  }
  getStores(): object[] {
    return this.stores;
  }
}
