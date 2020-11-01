import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-pasta',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class PastaComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner pasta'><h1>Pasta</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatPasta(res),
      error => console.log(error)
    );
    this.productService.getAll()
    .subscribe(
      res => this.productService.setProductsPasta(res),
      error => console.log(error)
    );
  }

}
  