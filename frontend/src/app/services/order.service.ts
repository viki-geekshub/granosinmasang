import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public orders: object[]; // Lo pongo publico aunque por buenas prácticas tendría que ser privado y acceder a ello por los getter y setter. Lo pongo public para facilitarme el acceso en otras partes del código
  private token: string;
  constructor(public httpClient: HttpClient) { }

  getAll(): Observable<any> {
    this.token = localStorage.getItem('authToken');
    return this.httpClient.get('http://localhost:3000/orders', {headers: {Authorization: this.token}});
  }
  setOrders(orders): void {
    this.orders = orders;
  }
  getOrders(): object[] {
    return this.orders;
  }
  createOrder(products){ // Función para enviar el pedido al backend
    this.token = localStorage.getItem('authToken'); // Cojo el token del localStorage
    return this.httpClient.post('http://localhost:3000/orders', {deliveryDate:"2020-05-15", products}, {headers: {Authorization: this.token}})
  }  // Y lo envió en la petición en la autorización de la cabecera
  
  // searchOrders(search) {
  //   return this.httpClient.get('http://localhost:3000/orders/name/' + search);
  // }
}
