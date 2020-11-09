import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-te-flores',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class TeFloresComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner te'><h1>Té y Flores Deshidratadas</h1></div>"
    this.subcategoryService.getAll()
      .subscribe(
        res => this.subcategoryService.setSubCatTeFlores(res),
        error => console.log(error)
      )
  };

}
