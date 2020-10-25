import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-arroces',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class ArrocesComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService, public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner arroces'><h1>Arroces</h1></div>"
    // this.categoryService.getAll()
    // .subscribe(
    //   res => this.categoryService.getAll(),
    //   error => console.log(error)
    // );
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatArroces(res),
      error => console.log(error)
    );
  }


}
