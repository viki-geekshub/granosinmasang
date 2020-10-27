import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-harinas',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class HarinasComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner harinas'><h1>Harinas</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatHarinas(res),
      error => console.log(error)
    );
  }


}
