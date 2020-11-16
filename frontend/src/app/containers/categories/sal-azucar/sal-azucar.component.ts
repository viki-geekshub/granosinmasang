import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sales-azucares',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class SalAzucarComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner sal'><h1>Sal y Azúcar</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatSalesAzucares(res),
      error => console.log(error)
    );
    this.productService.getAll()
    .subscribe(
      res => this.productService.setProductsSalesAzucares(res),
      error => console.log(error)
    );
  };
}
