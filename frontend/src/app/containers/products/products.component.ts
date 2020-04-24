import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(public productService: ProductService, public router: Router) { }

  ngOnInit(): void {
    this.productService.getAll()
      .subscribe(
        res => this.productService.setProducts(res),
        error => console.log(error)
      );
  }
  showDetails(productId:number){
    // this.router.navigate(['product/'+productId])  // Esta es otra manera diferente de poner lo mismo
    this.router.navigate(['product', productId ])
  }

}
