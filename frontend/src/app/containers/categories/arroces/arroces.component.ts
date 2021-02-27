import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-arroces',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class ArrocesComponent implements OnInit {
  tagName;
  filterTitle;
  constructor(public categoryService: CategoryService, public subcategoryService: SubcategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner arroces'><h1>Arroces</h1></div>"
    this.filterTitle = "Arroces"
    this.categoryService.getAll()
    .subscribe(
      res => this.categoryService.setCategories(res),
      error => console.log(error)
    );
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatArroces(res),
      error => console.log(error)
    );
    this.productService.getAll()
    .subscribe(
      res => this.productService.setProductsArroces(res),
      error => console.log(error)
    );
  };
}
