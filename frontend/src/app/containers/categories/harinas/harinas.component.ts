import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-harinas',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class HarinasComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner harinas'><h1>Harinas</h1></div>"
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


}
