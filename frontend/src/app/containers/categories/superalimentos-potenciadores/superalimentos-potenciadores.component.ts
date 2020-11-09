import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-superalimentos-potenciadores',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class SuperalimentosPotenciadoresComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner superalimentos'><h1>Superalimentos y Potenciadores de cocina</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatSuperalimentosPotenciadores(res),
      error => console.log(error)
    )
  };

}
