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
  onActivate(event) {
    let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, 0); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }

}
