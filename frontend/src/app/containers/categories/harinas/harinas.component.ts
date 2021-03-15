import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-harinas',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class HarinasComponent implements OnInit {
  tagName;
  filterTitle;
  // tslint:disable-next-line:max-line-length
  constructor(public categoryService: CategoryService, public subcategoryService: SubcategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    this.tagName = '<div class=\'herobanner harinas\'><h1>Harinas</h1></div>';
    this.filterTitle = 'Harinas';
    this.categoryService.getAll()
    .subscribe(
      res => this.categoryService.setCategories(res),
      error => console.log(error)
    );
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatHarinas(res),
      error => console.log(error)
    );
    this.productService.getAll()
    .subscribe(
      res => this.productService.setProductsHarinas(res),
      error => console.log(error)
    );
  }
  onActivate(event) {
    switch (event.target.id) {
      case 'Con Gluten':
        this.productService.getAll()
        .subscribe(
          res => this.productService.setProductsHarinasConGluten(res),
          error => console.log(error)
        );
        break;
      case 'Sin Gluten':
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsHarinasSinGluten(res),
        error => console.log(error)
      );
        break;
      default:
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsHarinas(res),
        error => console.log(error)
      );
        break;
    }
  }
  onClickMe(event) {
    console.log('hola mundo');
  }
}
