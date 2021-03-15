import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProductService } from 'src/app/services/product.service';
import { event } from 'jquery';
@Component({
  selector: 'app-arroces',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class ArrocesComponent implements OnInit {
  tagName;
  filterTitle;
  mobile: boolean;
  // tslint:disable-next-line:max-line-length
  constructor(public categoryService: CategoryService, public subcategoryService: SubcategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    if (window.screen.width <= 768) { // 768px portrait
      this.mobile = true;
    }
    this.tagName = '<div class=\'herobanner arroces\'><h1>Arroces</h1></div>';
    this.filterTitle = 'Arroces';
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
  }

  // FILTRO

  // tslint:disable-next-line:no-shadowed-variable
  onActivate(event) {
    switch (event.target.id) {
      case 'Blanco':
        this.productService.getAll()
        .subscribe(
          res => this.productService.setProductsArrocesBlanco(res),
          error => console.log(error)
        );
        break;
      case 'Integral':
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsArrocesIntegral(res),
        error => console.log(error)
      );
        break;
      default:
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsArroces(res),
        error => console.log(error)
      );
        break;
    }
  }
  // tslint:disable-next-line:no-shadowed-variable
  onClickMe(event) {
    const toggleList = document.getElementById('categoryList');
    if ( toggleList.style.display !== 'block' ) {
      toggleList.style.display = 'block';
    } else {
      toggleList.style.display = 'none';
    }
  }
}


