import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-especias',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class EspeciasComponent implements OnInit {
  tagName;
  filterTitle;
  // tslint:disable-next-line:max-line-length
  constructor(public categoryService: CategoryService, public subcategoryService: SubcategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    this.tagName = '<div class=\'herobanner especias\'><h1>Especias</h1></div>';
    this.filterTitle = 'Especias';
    this.categoryService.getAll()
    .subscribe(
      res => this.categoryService.setCategories(res),
      error => console.log(error)
    );
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatEspecias(res),
      error => console.log(error)
    );
    this.productService.getAll()
    .subscribe(
      res => this.productService.setProductsEspecias(res),
      error => console.log(error)
    );
  }
  onActivate(event) {
  }
  onClickMe(event) {
    console.log('hola mundo');
  }
}
