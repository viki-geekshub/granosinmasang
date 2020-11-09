import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-sales-azucares',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class SalesAzucaresComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner sales'><h1>Sales y Azúcares</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatSalesAzucares(res),
      error => console.log(error)
    )
  };

}
