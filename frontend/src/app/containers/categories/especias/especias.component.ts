import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-especias',
  templateUrl: './../categories.html',
  styleUrls: []
})
export class EspeciasComponent implements OnInit {

  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatEspecias(res),
      error => console.log(error)
    )
  };

}
