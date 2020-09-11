import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-alimentos-deshidratados',
  templateUrl: './../categories.html',
  styleUrls: []
})
export class AlimentosDeshidratadosComponent implements OnInit {

  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatAlimentosDeshidratados(res),
      error => console.log(error)
    )
  };

}
