import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-frutas-deshidratadas',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class FrutasDeshidratadasComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner frutasDeshidratadas'><h1>Frutas Deshidratadas</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatFrutasDeshidratadas(res),
      error => console.log(error)
    )
  };

}
