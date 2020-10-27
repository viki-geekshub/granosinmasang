import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-cafe',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class CafeComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner cafe'><h1>Café</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatCafe(res),
      error => console.log(error)
    )
  };

}