import { Component } from '@angular/core';
import { UserService } from './services/user.service'; // importo el UserService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public userService: UserService) {} // Inyecto el userService  // PREGUNTAR  ???

  ngOnInit() { // Y le digo que al iniciar haga lo siguiente:
    // Cuando arranca la aplicación lo que arranca primero es el app.component. Así que le quiero decir que si ve que hay un ítem (un token), nos ejecute setToken:

    const token = localStorage.getItem('authToken'); // Busco el token en el localStorage
    if (token) { //Si hay token, si existe:
      this.userService.getUserInfo(token) // Trato de obtener la info del user a partir del token. Envío el token al userService como parametro para que haga el getUserInfo
      .subscribe( // Después lo subscribo y cuando llega la respuesta: 
        res => {
          this.userService.setUser(res);  // Guardo en la propiedad user del userService la información del user que viene en la respuesta
          this.userService.setToken(token);  // Guardo el token como propiedad del userService
        },
        error => {
          console.log(error);
          localStorage.removeItem('authToken') // Si hay un error en el token, lo elimino del localStorage, porque si no es válido no nos hace falta para nada ese token.
          }
        );
    }
  }
}
