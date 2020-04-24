import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-potenciadores-cocina',
  templateUrl: './../categories.html',
  styleUrls: []
})
export class PotenciadoresCocinaComponent implements OnInit {

  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatPotenciadoresCocina(res),
      error => console.log(error)
    )
  };

}
