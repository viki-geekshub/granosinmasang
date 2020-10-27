import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-legumbres',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class LegumbresComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner legumbres'><h1>Legumbres</h1></div>"
    this.subcategoryService.getAll()
    .subscribe(
      res => this.subcategoryService.setSubCatLegumbres(res),
      error => console.log(error)
    );
  }

}
