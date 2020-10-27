import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-cacao',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class CacaoComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner cacao'><h1>Cacao</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatCacao(res),
      error => console.log(error)
    )
  };

}
