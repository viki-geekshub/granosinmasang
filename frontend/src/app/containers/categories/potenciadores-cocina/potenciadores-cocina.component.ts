import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-potenciadores-cocina',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class PotenciadoresCocinaComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner potenciadores'><h1>Potenciadores del sabor</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatPotenciadoresCocina(res),
      error => console.log(error)
    )
  };

}
