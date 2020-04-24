import { OrderService } from "./../../services/order.service";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
})
export class ShoppingCartComponent implements OnInit {
  totalCart;
  newCart;
  toggle: boolean = true; 
  constructor(public orderService: OrderService, public router: Router) {}

  ngOnInit(): void { // Al cargar la página:
    this.totalCart = JSON.parse(localStorage.getItem("cart")); // Recojo el carito del localStorage y lo guardo en una variablel totalCart
    console.log(this.totalCart);
  }
  sendOrder() { // Función para enviar el Pedido al servicio para que desde ahí se envíe al backend
    this.orderService.createOrder(this.totalCart) // Voy al servicio y le digo que ejecute la funcion createOrder y le paso la info del carrito
    .subscribe((res) => { // Espero la respuesta
      this.toggle = false; // Asigno como falsa la variable toggle para se muestre el mensaje de éxito 
      setTimeout(() => { // Y a los 3 segundos la vuelvo a  poner en true para que se vuelva a ocutarl el mensaje
        this.toggle = true;  //NO FUNCIONA
      }, 3000);
      localStorage.removeItem('cart')  // Borro el carrito del localStorage 
      this.router.navigate(['products']) //Y redirijo al usuario a la página de productos
    });
  }

  deleteFromCart(id:string) { // Función para borrar un producto del carrito
    localStorage.removeItem("cart"); // Borro del localStorage el carrito
    this.newCart = this.totalCart.filter((product) => product.id!== id); // creo un nuevo array donde guardo el anterior carrito filtrado por el id del producto que no quiero. Pasarían todos los productos menos el del id seleccionado y se guardaran en el array newCart
    localStorage.setItem("cart", JSON.stringify(this.newCart)); // Guardo el nuevo carrito ya filtrado en el localStorage
    location.reload(); // Recargo la página para que me muestre el carrito con la nueva selección y que deje de aparecer el producto borrado
  }
}
