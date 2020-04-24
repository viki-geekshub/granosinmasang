import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-frutos-secos',
  templateUrl: './../categories.html',
  styleUrls: []
})
export class FrutosSecosComponent implements OnInit {

  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatFrutosSecos(res),
      error => console.log(error))
  };

}
