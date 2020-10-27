import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-alimentos-deshidratados',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class AlimentosDeshidratadosComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner alimentosDeshidratados'><h1>Alimentos Deshidratados</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatAlimentosDeshidratados(res),
      error => console.log(error)
    )
  };

}
