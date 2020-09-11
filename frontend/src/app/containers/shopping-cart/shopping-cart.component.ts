import { OrderService } from "./../../services/order.service";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
})
export class ShoppingCartComponent implements OnInit {
  allCart; // Esta variable lleva dentro todo el carrito que esta guardado en el localStorage
  newCart; // Esta variable lleva el nuevo carrito, una vez que hemos borrado el producto que no queríamos
  toggle: boolean = true; // Variable booleana para mostrar o no mostrar el mensaje informativo (Se inicia en true para no se muestre nunca por defecto)
  totalProduct:number=0; // Esta variable suma el total de cada producto
  totalCart:number=0; // Esta variable suma el precio total del pedido completo sumando todos sus productos
  
  constructor(public orderService: OrderService, public router: Router) {}

  ngOnInit(): void { // Al cargar la página:
    this.allCart = JSON.parse(localStorage.getItem("cart")); // Recojo el carrito del localStorage y lo guardo en una variablel allCart
    this.totalCart = JSON.parse(localStorage.getItem("total")); // Recojo el total del pedido del localStorage y lo guardo en la variable totalCart
    
  }
  sendOrder() { // Función para enviar el Pedido al servicio para que desde ahí se envíe al backend
    this.orderService.createOrder(this.allCart,this.totalCart) // Voy al servicio y le digo que ejecute la funcion createOrder y le paso la info del carrito
    .subscribe((res) => { // Espero la respuesta
      this.toggle = false; // Asigno como falsa la variable toggle para se muestre el mensaje de éxito 
      setTimeout(() => { // Y a los 3 segundos 
        this.toggle = true; // la vuelvo a  poner en true para que se vuelva a ocultar el mensaje
        this.router.navigate(['products']) // Y redirijo al usuario a la página de productos 
      }, 3000);
      localStorage.removeItem('cart')  // Borro el carrito con todas sus propiedades del localStorage 
      localStorage.removeItem('total')  // Borro el precio total del pedido del localStorage
      this.totalCart=0; // Pongo a 0 la variable del precio total del pedido, porque una vez que se ha enviado a la base de datos ya no debería haber ningún total de pedido en el carrito.
    });
  }

  deleteFromCart(id:string) { // Función para borrar un producto del carrito:
    localStorage.removeItem("cart"); // Primero borro del localStorage el carrito
    this.newCart = this.allCart.filter((product) => product.id!== id); // Creo un nuevo array donde guardo el anterior carrito ya filtrado por el id del producto que no quiero. De modo que pasarán todos los productos menos el del id seleccionado y se guardaran en el array newCart
    if(this.newCart.length > 0){ // Le digo que solo en el caso de que no haya carrito (cuando no hemos metido nada en la variable newCart) nos meta entonces el carrito (Así solo nos metera el carrito cuando no haya carrito ni aquí ni en el localStorage, porque si no lo hacemos así nos metía un carrito vacío)
      localStorage.setItem("cart", JSON.stringify(this.newCart)); // Entonces, cuando no hay carrito, guardo el nuevo carrito, ya filtrado, en el localStorage
      this.allCart = JSON.parse(localStorage.getItem("cart")); // Guardo el carrito, que ya tendrá todo junto guardado dentro, en la variable allCart que es lo que se va a mostrar en pantalla. Esto es lo que nos va pintar los productos en el shopping cart
        // Aquí muestro el carrito con la info nueva
    }else{
      this.allCart = JSON.parse(localStorage.getItem("cart")); // Y le digo que haga lo mismo aqui y que también nos lo muestre incluso cuando no se cumpla la condicion de que no haya carrito. En este caso la diferencia es que en el carrito no habrá nada y no nos mostrará nada 
    } // Aqui muestro el carrito pero vacío
  }
}
