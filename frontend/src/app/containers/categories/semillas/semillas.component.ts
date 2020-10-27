import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-semillas',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class SemillasComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner semillas'><h1>Semillas</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatSemillas(res),
      error => console.log(error)
    )
  };

}
