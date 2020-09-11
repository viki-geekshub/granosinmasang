import { Component, OnInit } from '@angular/core'; // El core es un modulo de angular de donde sacamos los componentes y el OnInit, que es "Al inicio"
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { 
  public user: any = {  // Creo un objeto vacío con las propiedades de email y password. Aquí guardaremos el usuario logado
    email: '',
    password: '',
  }
  public errorMsg: string; // Tipamos las variables errorMsg y successMsg como string
  public successMsg: string;  // Aquí estamos creando los dos mensajes, el de error y el bienvenida para pintarlos luego en el html mediante las variables interpoladas
  constructor(public userService: UserService, public router: Router) { } // Tengo que poner aquí el Router para poder utilizar el redirectRoute más abajo. Es para poder hacer redirecciones a otras páginas

  ngOnInit(): void { // Al iniciar: 
  }
  login(event) { 
    event.preventDefault(); // Evito que refresque la página por defecto
    this.userService.login(this.user) // Mando el usuario al userService, a la funcióno de login
      .subscribe( // Lo subscribo y cuando llega la respuesta: 
        (res: HttpResponse<any>) => {
          //En redirectRoute guardamos la ruta a redirigir en función de si el usuario que se ha conectado es admin o no
          const admins = ['superadmin', 'admin']; // Creo un array para guardar los roles de admin y superadmin
          const redirectRoute = admins.includes(res['user']['role']) ? '/orders':'/'; // Si la respuesta incluye los roles de admin o superadmin guardame la ruta "/admin" en la constante redirectRoute, si no, guardame "/"
          // const redirectRoute = res['user']['role']==='admin' ? '/admin':'/'; // Otra forma de hacerlo pero solo para el rol de admin
          this.successMsg=res['message']; //Guardo el mensaje de éxito en la variable successMsg
          this.userService.setUser(res['user']); // Guardo el user en el userService (Usamos setUser por buenas prácticas)
          this.userService.setToken(res['token']); // Guardo el token en el userService. (Usamos setToken por buenas prácticas)
          localStorage.setItem('authToken', res['token']); // Guardo el token en el localstorage. El sessionstorage es solo para una sesión y cuando cierras el navegador se pierde ese token. Si lo guardamos en el localstorage durará para varias sesiones
          setTimeout(() => this.router.navigate([redirectRoute]) , 2500); // y aquí le pido que navegue a la ruta guardada en redirectRoute
        },
        (error: HttpErrorResponse) => { 
          this.errorMsg = error.error.message;
          setTimeout(() => this.errorMsg ="", 2500);
        }
      )
  }
  
}
