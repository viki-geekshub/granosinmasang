import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-confirmed',
  templateUrl: './user-confirmed.component.html',
  styleUrls: ['./user-confirmed.component.scss']
})
export class UserConfirmedComponent implements OnInit {
  email:string;
  constructor(
    private route: ActivatedRoute, // Lo añado porque queremos coger el token. Lo inyecto en el servicio mediante el constructor y le digo que me coja el authToken del redirect del UserController que va a la ruta, y de la ruta al componente user-confirmed.
    private router: Router,  // Lo añado para poder redirigir al login
    public userService: UserService  // Lo añado para poder llamar al metodo getUserInfo 
    ) {  }

  ngOnInit(): void {
    const token = this.route.snapshot.params.token; // Cojo el token
    this.userService.getUserInfo(token)  // Se lo paso como parametro a la función getUserInfo para que nos saque el usuario que corresponda a ese token
    .subscribe( // Lo subscribo y cuando llegue la respuesta
      res => this.userService.setUser(res) // Le decimos que ejecute la función setUser para que nos guarde los del usuario en un objeto (por buenas prácticas)
    );
    localStorage.setItem('authToken', token);  // Guardo el token en el localStorage
    setTimeout(() => {  // Y a los tres segundos le digo al navegador que nos lleve a la vista del login
      this.router.navigate(['login']);
    }, 3000);
  }
}
