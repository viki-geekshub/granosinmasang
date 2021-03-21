import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {
  public width  = 10;
  public isShow = true;
  public icon = 'search';
  public transition = '';
  public admins = ['superadmin', 'admin'];
  public categories;
  mobile: boolean;
  mobile2: boolean;
  holaMundo: any;
  public toggleDisplay() {
    this.isShow = !this.isShow;
    if (this.icon === 'search') {
      this.icon = 'highlight_off';
      this.width = 30;
    } else {
      this.icon = 'search';
      this.width = 10;
    }
  }
  constructor(
    public userService: UserService,
    public productService: ProductService,
    public router: Router,
    public categoryService: CategoryService
  ) {}

  onActivate(event) {
    const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }

  mouseEnter(event) {
    console.log('mouse enter');
  }

  onMenuToggle(event) {
    const menuList = document.getElementsByClassName('menu2');
    if (menuList.style.display === 'block') {
      menuList.style.display = '';
    } else {
      menuList.style.display = 'block';
    }
  }

  ngOnInit(): void {
    if (window.screen.width <= 768) { // 768px portrait
      this.mobile = true;
      this.mobile2 = true;
    }

    this.categoryService.getAll().subscribe((res) => {
      this.categories = res;
    });
  }
  searchProducts(event: any) {
    const searchValue = event.target.search.value;
    this.router.navigate(['/products/search', searchValue]);
  }
  logout() {
    localStorage.removeItem('authToken');
    this.userService.setUser({});
  }
}
