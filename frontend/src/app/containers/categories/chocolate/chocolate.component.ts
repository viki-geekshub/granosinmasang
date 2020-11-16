import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-chocolate',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class ChocolateComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner chocolate'><h1>Chocolate</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatChocolates(res),
      error => console.log(error)
    );
    this.productService.getAll()
    .subscribe(
      res => this.productService.setProductsChocolates(res),
      error => console.log(error)
    );
  };
}
