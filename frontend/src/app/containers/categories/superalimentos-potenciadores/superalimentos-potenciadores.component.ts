import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-superalimentos-potenciadores',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class SuperalimentosPotenciadoresComponent implements OnInit {
  tagName;
  filterTitle;
  constructor(public categoryService: CategoryService, public subcategoryService: SubcategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner superalimentos'><h1>Superalimentos y Potenciadores de cocina</h1></div>"
    this.filterTitle = "Superalimentos y Potenciadores"
    this.categoryService.getAll()
    .subscribe(
      res => this.categoryService.setCategories(res),
      error => console.log(error)
    );
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatSuperalimentosPotenciadores(res),
      error => console.log(error)
    );
    this.productService.getAll()
    .subscribe(
      res => this.productService.setProductsSuperalimentosPotenciadores(res),
      error => console.log(error)
    );
  };
  onActivate(event) {
    switch (event.target.id) {
      case "Superalimentos":
        this.productService.getAll()
        .subscribe(
          res => this.productService.setProductsSuperalimentosPotenciadoresSuperalimentos(res),
          error => console.log(error)
        );
        break;
      case "Potenciadores de cocina":
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsSuperalimentosPotenciadoresPotenciadores(res),
        error => console.log(error)
      );
      break;
      default:
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsSuperalimentosPotenciadores(res),
        error => console.log(error)
      ); 
        break;
    }
  };
};
