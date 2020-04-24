import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-cafe',
  templateUrl: './../categories.html',
  styleUrls: []
})
export class CafeComponent implements OnInit {

  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatCafe(res),
      error => console.log(error)
    )
  };

}