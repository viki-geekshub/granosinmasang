import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesHomeService } from 'src/app/services/categories-home.service';

@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: ['./categories-home.component.scss']
})
export class CategoriesHomeComponent implements OnInit {

  constructor(public categoryHome: CategoriesHomeService, public router: Router) { }

  ngOnInit(): void {
    this.categoryHome.getAll()
      .subscribe(
        res => this.categoryHome.setCategories(res),
        error => console.log(error)
      );
  }

}
