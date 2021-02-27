import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cereales',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class CerealesComponent implements OnInit {
  tagName;
  filterTitle;
  constructor(public categoryService: CategoryService, public subcategoryService: SubcategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner cereales'><h1>Cereales</h1></div>"
    this.filterTitle = "Cereales"
    this.categoryService.getAll()
    .subscribe(
      res => this.categoryService.setCategories(res),
      error => console.log(error)
    );
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatCereales(res),
      error => console.log(error)
    );
    this.productService.getAll()
    .subscribe(
      res => this.productService.setProductsCereales(res),
      error => console.log(error)
    );
  };
  onActivate(event) {
  };
};
