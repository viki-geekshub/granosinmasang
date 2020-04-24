import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-super-alimentos',
  templateUrl: './../categories.html',
  styleUrls: []
})
export class SuperAlimentosComponent implements OnInit {

  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatSuperAlimentos(res),
      error => console.log(error)
    )
  };

}
