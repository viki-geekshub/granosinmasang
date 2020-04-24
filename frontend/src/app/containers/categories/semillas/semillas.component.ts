import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-semillas',
  templateUrl: './../categories.html',
  styleUrls: []
})
export class SemillasComponent implements OnInit {

  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatSemillas(res),
      error => console.log(error)
    )
  };

}
