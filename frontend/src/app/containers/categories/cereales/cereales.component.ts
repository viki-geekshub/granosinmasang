import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-cereales',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class CerealesComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner cereales'><h1>Cereales</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatCereales(res),
      error => console.log(error))
  };

}
