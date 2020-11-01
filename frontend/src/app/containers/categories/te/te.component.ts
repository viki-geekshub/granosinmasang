import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-te',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class TeComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner te'><h1>Té</h1></div>"
    this.subcategoryService.getAll()
      .subscribe(
        res => this.subcategoryService.setSubCatTe(res),
        error => console.log(error)
    );
    this.productService.getAll()
    .subscribe(
      res => this.productService.setProductsTe(res),
      error => console.log(error)
    );
  }

}
