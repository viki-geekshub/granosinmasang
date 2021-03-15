import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-frutas-deshidratadas',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class FrutasDeshidratadasComponent implements OnInit {
  tagName;
  filterTitle;
  // tslint:disable-next-line:max-line-length
  constructor(public categoryService: CategoryService, public subcategoryService: SubcategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    this.tagName = '<div class=\'herobanner frutasDeshidratadas\'><h1>Frutas Deshidratadas</h1></div>';
    this.filterTitle = 'Frutas Deshidratadas';
    this.categoryService.getAll()
    .subscribe(
      res => this.categoryService.setCategories(res),
      error => console.log(error)
    );
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatFrutasDeshidratadas(res),
      error => console.log(error)
    );
    this.productService.getAll()
    .subscribe(
      res => this.productService.setProductsFrutasDeshidratadas(res),
      error => console.log(error)
    );
  }
  onActivate(event) {
    switch (event.target.id) {

      case 'Con Azúcar':
        this.productService.getAll()
        .subscribe(
          res => this.productService.setProductsFrutasDeshidratadasConAzucar(res),
          error => console.log(error)
          );
        break;
          case 'Sin Azúcar':
            this.productService.getAll()
            .subscribe(
              res => this.productService.setProductsFrutasDeshidratadasSinAzucar(res),
              error => console.log(error)
              );
            break;
              default:
                console.log(event.target);
                this.productService.getAll()
                .subscribe(
                  res => this.productService.setProductsFrutasDeshidratadas(res),
                  error => console.log(error)
      );
                break;
    }
  }
  onClickMe(event) {
    console.log('hola mundo');
  }
}
