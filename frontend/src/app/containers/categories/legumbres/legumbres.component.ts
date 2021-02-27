import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-legumbres',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class LegumbresComponent implements OnInit {
  tagName;
  filterTitle;
  constructor(public categoryService: CategoryService, public subcategoryService: SubcategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner legumbres'><h1>Legumbres</h1></div>"
    this.filterTitle = "Legumbres"
    this.categoryService.getAll()
    .subscribe(
      res => this.categoryService.setCategories(res),
      error => console.log(error)
    );
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatLegumbres(res),
      error => console.log(error)
    );
    this.productService.getAll()
    .subscribe(
      res => this.productService.setProductsLegumbres(res),
      error => console.log(error)
    );
  };
  onActivate(event) {
    switch (event.target.id) {
      case "Alubias":
        this.productService.getAll()
        .subscribe(
          res => this.productService.setProductsLegumbresAlubias(res),
          error => console.log(error)
        );
        break;
      case "Garbanzos":
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsLegumbresGarbanzos(res),
        error => console.log(error)
      );
      break;
      case "Lentejas":
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsLegumbresLentejas(res),
        error => console.log(error)
      );
      break;
      case "Otros":
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsLegumbresOtros(res),
        error => console.log(error)
      );
      break;
      default:
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsLegumbres(res),
        error => console.log(error)
      ); 
        break;
    }
  };
};
