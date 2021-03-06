import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-especias',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class EspeciasComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner especias'><h1>Especias</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatEspecias(res),
      error => console.log(error)
    )
  };

}
