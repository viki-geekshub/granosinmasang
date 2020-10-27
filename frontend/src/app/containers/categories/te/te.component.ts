import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-te',
  templateUrl: './../categories.html',
  styleUrls: ['./../categories.scss']
})
export class TeComponent implements OnInit {
  tagName;
  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.tagName = "<div class='herobanner te'><h1>Té</h1></div>"
    this.subcategoryService.getAll()
      .subscribe(
        res => this.subcategoryService.setSubCatTe(res),
        error => console.log(error)
      )
  };

}
