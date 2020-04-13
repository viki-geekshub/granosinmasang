import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: string = ""; // El token por buenas prácticas debe ser private. Es una string vacía al principio para evitar que nos venga "undefined" ya que en este caso, cuando pides un token no tiene porque venir siempre una string. Así, cuando lo tipemos abajo, no nos dará error por ser indefined en lugar de string *
  private user:object={}; // El usuario por buenas prácticas debe ser private. Es un objeto vacío al principio
//Aqui es donde vamos a guardar los datos del usuario y del token con el que se ha logueado.

  constructor(public httpClient: HttpClient) { }
  login(user: object): Observable<any> {  // Envío la petición al backend
    return this.httpClient.post('http://localhost:3000/users/login', user);
  }
  register(user: object) {
    return this.httpClient.post('http://localhost:3000/users/register', user);
  }
  //Utilizamos los metodos getter y setter para acceder al token y al user. Al no ser públicos no podríamos acceder sin utilizar estos métodos.
  setToken(token: string): void { // Al ser un método setter esta vacío y le digo "void" porque no devuelve nada
    this.token = token; // meto este token en el token
  }
  getToken(): string { // El getToken lo necesitamos para llamar al token cada vez que haga falta
    return this.token; // me devuelve este token. Le decimos que nos tiene que venir una string, pero no siempre tiene porque venir una string, porque si resulta que no hay token, nos vendrá "undefined". Por eso, para evitar que nos venga algo que no sea una string, le obligamos en la variable de arriba, a que es una string vacía
  }
  setUser(user: object): void { // Pongo este usuario en el objeto vacío que he definido arriba
    this.user = user;
  }
  getUser(): object { // El getUser lo necesito para llamar al user cada vez que me haga falta
    return this.user;
  }
  getUserInfo(token: string) {
    //Pregunto al endpoint si ese token corresponde a un usuario y le digo que si así nos traiga la información del usuario (objeto)
    return this.httpClient.get('http://localhost:3000/users/info', { // Hacemos la petición get al backend, para pedirle que nos diga si el token está autorizado
      headers: { // Esto es para decirle que todas las peticiones vayan con esta cabecera
        authorization: token
      }
    });
  }
}
