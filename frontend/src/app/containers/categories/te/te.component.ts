import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-te',
  templateUrl: './../categories.html',
  styleUrls: []
})
export class TeComponent implements OnInit {

  constructor(public subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.subcategoryService.getAll()
      .subscribe(
        res => this.subcategoryService.setSubCatTe(res),
        error => console.log(error)
      )
  };

}
