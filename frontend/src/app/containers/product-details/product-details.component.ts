import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public product;
  public ammount=50; // Obligo a que se inicialice en 50 gramos la cantidad
  public hidden:boolean=true; // Esta variable, cuando es true, oculta el mensaje de "Producto añadido al carrito"
  cart:Object={}; // Aquí recojo el producto añadido al carrito con sus propiedades
  oldCart:Array<{}>=[];  // Aquí creo un array vacía donde iré añadiendo cada objeto del carrito
  constructor(public productService: ProductService, public route: ActivatedRoute) { }

  ngOnInit(): void { // Al cargar la página:
    const id = this.route.snapshot.params.id; // Recojo el id del producto que hemos seleccionado
    this.productService.getOne(id) // Le pido al servicio que me ejecute la función de getOne() con ese id
    .subscribe( // Espero a que me llegue la respuesta del backend
      res=>{this.product = res;}); // Y la guardo en la variable "res"
  }

  addCart(){ // Función para añadir al carrito
    this.cart=({id:this.product['id'], name:this.product['name'], price:this.product['price'], packedPrice:this.product['packedPrice'], totalPrice:this.product['price'] + this.product['packedPrice'], image_path:this.product['image_path'], ammount:this.ammount}) // Aquí creo el carrito y guardo todas las propiedades que voy a necesitar en el objeto "cart".

    // (Cuando metemos el primer producto en el carrito aún no habrá nada guardado en el localStorage así que no entrará en el if. Entraremos en el if a partir del segundo producto que queramos añadir)
  
  if(localStorage.getItem("cart")){  // Si hay carrito guardado en el localStorage entonces:  
    this.oldCart=JSON.parse(localStorage.getItem('cart')) // Cojo todo lo que hay guardado en el localStorage y lo guardo en la variable oldCart (hay que parsear el json para ello)
    localStorage.removeItem('cart') // Borro el carrito de actual del localStorage (ya lo tenemos en oldCart)
    this.oldCart.push(this.cart) // Añado a la array "oldCart" el nuevo producto que hemos guadado en "cart"
    localStorage.setItem("cart", JSON.stringify(this.oldCart)) // Y guardo en el localStorage lo nuevo y lo viejo
    // Si no hay carrito en el localStorage (es decir, si es el primer producto que añadimos) entonces:
  }else{localStorage.setItem("cart", JSON.stringify([this.cart]))} // Guardame el carrito con ese primer producto añadido en el localStorage (hay que convertir el json en string porque el localStorage solo guarda string)
  this.hidden=false; // Despué le digo a la variable hidden que sea false, para que se deje de ocultar el mensaje de "Producto añadido al carrito"
  setTimeout(() => { 
    this.hidden=true;
  }, 2500);// A los 2 segundos y medio volvemos a decirle a hidden que sea true, lo que hara que se vuelva a ocutar el mensaje
  }
  
}
