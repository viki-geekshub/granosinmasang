import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-frutos-secos',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class FrutosSecosComponent implements OnInit {
  tagName;
  filterTitle;
  // tslint:disable-next-line:max-line-length
  constructor(public categoryService: CategoryService, public subcategoryService: SubcategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    this.tagName = '<div class=\'herobanner frutosSecos\'><h1>Frutos Secos</h1></div>';
    this.filterTitle = 'Frutos Secos';
    this.categoryService.getAll()
    .subscribe(
      res => this.categoryService.setCategories(res),
      error => console.log(error)
    );
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatFrutosSecos(res),
      error => console.log(error)
    );
    this.productService.getAll()
    .subscribe(
      res => this.productService.setProductsFrutosSecos(res),
      error => console.log(error)
    );
  }
  onActivate(event) {
    switch (event.target.id) {
      case 'Almendras':
        this.productService.getAll()
        .subscribe(
          res => this.productService.setProductsFrutosSecosAlmendras(res),
          error => console.log(error)
        );
        break;
      case 'Anacardos':
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsFrutosSecosAnacardos(res),
        error => console.log(error)
      );
        break;
      case 'Avellanas':
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsFrutosSecosAvellanas(res),
        error => console.log(error)
      );
        break;
      case 'Cacahuetes':
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsFrutosSecosCacahuetes(res),
        error => console.log(error)
      );
        break;
      case 'Castañas':
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsFrutosSecosCastañas(res),
        error => console.log(error)
      );
        break;
      case 'Nueces':
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsFrutosSecosNueces(res),
        error => console.log(error)
      );
        break;
      case 'Pipas':
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsFrutosSecosPipas(res),
        error => console.log(error)
      );
        break;
      case 'Otros':
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsFrutosSecosOtros(res),
        error => console.log(error)
      );
        break;
      default:
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsFrutosSecos(res),
        error => console.log(error)
      );
        break;
    }
  }
  onClickMe(event) {
    console.log('hola mundo');
  }
}
