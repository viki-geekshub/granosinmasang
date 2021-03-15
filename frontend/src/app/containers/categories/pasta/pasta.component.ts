import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-pasta',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class PastaComponent implements OnInit {
  tagName;
  filterTitle;
  // tslint:disable-next-line:max-line-length
  constructor(public categoryService: CategoryService, public subcategoryService: SubcategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    this.tagName = '<div class=\'herobanner pasta\'><h1>Pasta</h1></div>';
    this.filterTitle = 'Pasta';
    this.categoryService.getAll()
    .subscribe(
      res => this.categoryService.setCategories(res),
      error => console.log(error)
    );
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatPastas(res),
      error => console.log(error)
    );
    this.productService.getAll()
    .subscribe(
      res => this.productService.setProductsPastas(res),
      error => console.log(error)
    );
  }
  onActivate(event) {
    switch (event.target.id) {
      case 'Con Gluten':
        this.productService.getAll()
        .subscribe(
          res => this.productService.setProductsPastasConGluten(res),
          error => console.log(error)
        );
        break;
      case 'Sin Gluten':
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsPastasSinGluten(res),
        error => console.log(error)
      );
        break;
      default:
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsPastas(res),
        error => console.log(error)
      );
        break;
    }
  }
  onClickMe(event) {
    console.log('hola mundo');
  }
}

