import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {
  products; // No inicializo esta variable, solo la defino. Aquí meteré la respuesta que nos llegue del backend tras hacer la búsqueda
  constructor(
    public route: ActivatedRoute,
    public productService: ProductService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.route.params  // Esto es una promesa y por eso tenemos que hacer un subscribe. Cojo el parametro de la ruta
      .subscribe(params => { // y después cuando lo tengo, creo una función para decirle que
        this.productService.searchProducts(params.searchValue) // se vaya al servicio de product y ejecute el metodo searchProduct y le pasamos como variable el valor de la busqueda del parámetro
          .subscribe( // espero la respuesta
            (res: HttpResponse<any>) => { // y cuando nos llega
              this.products = res; // la guardo en la variable res
              if (!params.searchValue || this.products.length === 0) { // Y le digo que si el valor del parametro no existe (no escriben nada) o si lo que han escrito no existe entre los productos de la respuesta 
                this.router.navigate(['/notFound']); // entonces que me redirija al notFound
              } 
            },
            (error: HttpErrorResponse) => console.log(error) // Por ultimo, si hay un error que lo muestre por consola.
          );
      });
  }

}
