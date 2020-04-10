import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll()
      .subscribe(
        res => this.productService.setProducts(res),
        error => console.log(error)
      );
  }

}
