import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-semolas',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class SemolasComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner semolas'><h1>Sémolas</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatSemolas(res),
      error => console.log(error))
  };

}
