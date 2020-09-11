import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public product; // Esta variable guardará todas las propiedades del producto
  public ammount=50; // Obligo a que se inicialice en 50 gramos la cantidad
  public hidden:boolean=true; // Esta variable, cuando es true, oculta el mensaje de "Producto añadido al carrito"
  public allow:boolean=false;  // Esta variable, cuando es false, no permite mostrar el mensaje de "Debes loguearte primero"
  cart:Object; // Aquí recojeré el producto añadido al carrito con sus propiedades. Es importante no inicializarla como vacía porque si lo hacemos así nos dará error. Antes estaba así: cart:Object={}; y lo tuvimos que quitar para definir la variable cart, pero sin inicializarla como un objeto vacío. Simplemente no la inicializamos para que no nos pueda meter objetos vacíos al clickar en el botón de Añadir al carrito
  oldCart:Array<{}>=[];  // Aquí creo un array vacía donde iré añadiendo cada objeto del carrito
  packedPrice:number=0; // Esta variable guardará el precio del envasado. Se inicializa a 0 y solo le añadiremos la cantidad si se selecciona el checkbox
  totalProduct:number= 0; // Esta variable sumará el total de cada producto. Se inicializa como 0
  totalCart:number=0; // Esta variable sumará el precio total del pedido completo sumando todos sus productos. Se inicializa en 0
  public packed:boolean=false; // Esta variable, me indica por defecto que no se incluye el envasado
  constructor(public productService: ProductService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void { // Al cargar la página:
    const id = this.route.snapshot.params.id; // Recojo el id del producto que hemos seleccionado
    this.productService.getOne(id) // Le pido al servicio que me ejecute la función de getOne() para que me de los datos del producto que tiene el id indicado, que es el mismo que hemos recogido de los parametros de la ruta
    .subscribe( // Espero a que me llegue la respuesta del backend
      res=>{this.product = res;}); // Y la guardo el producto que me ha llegado del backend en la variable "res"
  }

  onChange(isChecked:boolean){
    if(isChecked){
      this.packedPrice = this.product['packedPrice'];
      this.packed = true;
      }else{
        this.packedPrice = 0;
      }
  }

  addCart(){ // Función para añadir al carrito (SOLO PODRA AÑADIR AL CARRITO UN CLIENTE LOGUEADO)
    
    this.totalProduct = this.ammount / 1000 * this.product['price'] + this.packedPrice // Calculo el total del producto en función de la cantidad seleccionada, diciéndole que debe dividir la cantidad que viene en gramos entre 1000 para convertirlo en kilos, multiplicarlo por el precio por kilo del producto y sumarle por último el precio del embasado
    this.totalProduct= Math.round(this.totalProduct * 100) / 100; // Redondeo el cálculo del total del producto
     
    if(localStorage.getItem("authToken")) { // Y le digo que si hay token en el localStorage, es decir si es cliente y está conectado, que me cree el carrito:
      
      // A continuación es donde se envía la información al carrito, guardando todas las propiedades que voy a necesitar del producto en el objeto "cart".
      this.cart=({id:this.product['id'], name:this.product['name'], image_path:this.product['image_path'], 
      ammount:this.ammount, packed:this.packed, price:this.product['price'], packedPrice:this.product['packedPrice'], 
      totalProduct:this.totalProduct}) // Aquí le digo que me coja como total del producto el calculo redondeado que teníamos preparado arriba 
      // Después guardamos el precio total del producto ya calculado y redondeado en la variable totalCart
      this.totalCart=this.totalProduct;
    

    }else{ // Si no hay token, es decir, si no es cliente o no está logueado, entonces:
      this.allow=true; // Cambio a true la variable allow para que permita que se muestre el mensaje de advertencia de que debes estar logueado para hacer un pedido
      setTimeout(() => {  // Y a los 3 segundos: 
        this.allow=false; // Hago desaparecer el mensaje 
        this.router.navigate(['login']);  // Y redirijo al login
      }, 3000);
    }
    // (Cuando metemos el primer producto en el carrito aún no habrá nada guardado en el localStorage así que no entrará en el if. Entraremos en el if a partir del segundo producto que queramos añadir)
  
  if(localStorage.getItem("cart")){  // Si ya hay un carrito guardado en el localStorage entonces:
     
    this.oldCart=JSON.parse(localStorage.getItem('cart')) // Cojo todo lo que hay guardado en el localStorage (el carrito) y lo guardo en la variable oldCart (hay que parsear el json para ello)
    localStorage.removeItem('cart') // Borro el carrito actual del localStorage (porque ya lo tenemos guardado en oldCart)
    this.oldCart.push(this.cart) // Añado a la array "oldCart" el nuevo producto que hemos guadado en "cart"
    localStorage.setItem("cart", JSON.stringify(this.oldCart)) // Y guardo en el localStorage, con el metodo setItem (que es para poner un item en un sitio) tanto lo nuevo como lo viejo junto, porque ya hemos guardado previamente todo en el oldCart (en la linea anterior, con el push). 
    // Para guardar cualquier cosa en el localstorage necesitamos una clave (key) y un valor =>  "cart" es la key y el valor es "oldCart"

    this.totalCart=JSON.parse(localStorage.getItem('total')) // Cojo el precio total del pedido que está guardado en el localStorage y lo guardo en la variable totalCart
    localStorage.removeItem('total') // Borro ese precio total del pedido del localStorage (porque lo acabamos de guardar en el totalCart)
    this.totalCart += this.totalProduct // Añado al precio total del pedido (que hemos recogido en totalCart) el precio total del nuevo producto
    localStorage.setItem("total", JSON.stringify(this.totalCart)) // Y guardo en el localStorage el nuevo precio total del pedido con el nuevo producto ya sumado
    
    this.hidden=false; // Desoculto el mensaje de advertencia que dice que el producto se ha añadido al carrito con exito
    setTimeout(() => { // Y a los tres segundos:
      this.hidden=true; // Lo vuelvo a ocultar
    }, 3000);
     
  }else // Y si no hay carrito en el localStorage (es decir, si es el primer producto que añadimos)
        if(this.cart){ // Pero si que hay carrito en la variable "cart" (es decir, solo si se ha guardado un producto en la variable cart pulsando el botón "añadir al carrito"):
        // Entonces:
    localStorage.setItem("cart", JSON.stringify([this.cart])) // Guardo dicho carrito con ese primer producto ya añadido en el localStorage (hay que convertir el json en string porque el localStorage solo guarda string)
    localStorage.setItem("total", JSON.stringify(this.totalCart)) // Y guardo también en el localStorage el precio total del pedido, con su clave y su valor
    this.hidden=false; // Después le digo a la variable hidden que sea false, para que se deje de ocultar el mensaje de "Producto añadido al carrito"
    setTimeout(() => { // Y a los 3 segundos:
      this.hidden=true; // volvemos a decirle a hidden que sea true, lo que hará que se vuelva a ocutar el mensaje
    }, 3000); 
    }
  } 
}
  

