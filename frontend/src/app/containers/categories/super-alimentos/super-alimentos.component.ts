import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-super-alimentos',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class SuperAlimentosComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner superalimentos'><h1>Superalimentos</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatSuperAlimentos(res),
      error => console.log(error)
    )
  };

}
