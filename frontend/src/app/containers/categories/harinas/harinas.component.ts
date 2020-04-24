import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-harinas',
  templateUrl: './../categories.html',
  styleUrls: []
})
export class HarinasComponent implements OnInit {

  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatHarinas(res),
      error => console.log(error)
    );
  }


}
