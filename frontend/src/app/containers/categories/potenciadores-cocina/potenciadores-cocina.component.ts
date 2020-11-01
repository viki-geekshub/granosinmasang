import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-potenciadores-cocina',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class PotenciadoresCocinaComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner potenciadores'><h1>Potenciadores del sabor</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatPotenciadoresCocina(res),
      error => console.log(error)
    );
    this.productService.getAll()
    .subscribe(
      res => this.productService.setProductsPotenciadoresCocina(res),
      error => console.log(error)
    );
  }

}
