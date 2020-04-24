import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-frutas-deshidratadas',
  templateUrl: './../categories.html',
  styleUrls: []
})
export class FrutasDeshidratadasComponent implements OnInit {

  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatFrutasDeshidratadas(res),
      error => console.log(error)
    )
  };

}
