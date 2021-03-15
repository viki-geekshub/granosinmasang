import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-te-flores',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class TeFloresComponent implements OnInit {
  tagName;
  filterTitle;
  mobile: boolean;
  // tslint:disable-next-line:max-line-length
  constructor(public categoryService: CategoryService, public subcategoryService: SubcategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    if (window.screen.width <= 768) { // 768px portrait
      this.mobile = true;
    }
    this.tagName = '<div class=\'herobanner te\'><h1>Té y Flores Deshidratadas</h1></div>';
    this.filterTitle = 'Té y Flores';
    this.categoryService.getAll()
    .subscribe(
      res => this.categoryService.setCategories(res),
      error => console.log(error)
    );
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatTesFlores(res),
      error => console.log(error)
    );
    this.productService.getAll()
    .subscribe(
      res => this.productService.setProductsTesFlores(res),
      error => console.log(error)
    );
  }
  // FILTRO
  onActivate(event) {
    switch (event.target.id) {
      case 'Negro':
        this.productService.getAll()
        .subscribe(
          res => this.productService.setProductsTesFloresNegro(res),
          error => console.log(error)
        );
        break;
      case 'Verde':
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsTesFloresVerde(res),
        error => console.log(error)
      );
        break;
      case 'Rooibos':
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsTesFloresRooibos(res),
        error => console.log(error)
      );
        break;
      case 'Mezclas':
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsTesFloresMezclas(res),
        error => console.log(error)
      );
        break;
      case 'Infusiones':
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsTesFloresInfusiones(res),
        error => console.log(error)
      );
        break;
      case 'Flores Deshidratadas':
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsTesFloresFlores(res),
        error => console.log(error)
      );
        break;
      case 'Complementos':
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsTesFloresComplementos(res),
        error => console.log(error)
      );
        break;
      default:
        this.productService.getAll()
      .subscribe(
        res => this.productService.setProductsTesFlores(res),
        error => console.log(error)
      );
        break;
    }
  }
   // Acordeón para moviles
   onClickMe(event) {
    const toggleList = document.getElementById('categoryList');
    if ( toggleList.style.display !== 'block') {
      toggleList.style.display = 'block';
    } else {
      toggleList.style.display = 'none';
      }
    }
}
