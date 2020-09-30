import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-arroces',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class ArrocesComponent implements OnInit {

  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatArroces(res),
      error => console.log(error)
    );
  }


}
