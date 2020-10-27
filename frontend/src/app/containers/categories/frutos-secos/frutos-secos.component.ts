import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-frutos-secos',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class FrutosSecosComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner frutosSecos'><h1>Frutos Secos</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatFrutosSecos(res),
      error => console.log(error))
  };

}
