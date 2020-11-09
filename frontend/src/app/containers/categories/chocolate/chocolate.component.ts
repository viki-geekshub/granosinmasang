import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-chocolate',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class ChocolateComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner chocolate'><h1>Chocolate</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatChocolate(res),
      error => console.log(error)
    )
  };

}
