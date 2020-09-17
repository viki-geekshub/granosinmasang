import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  isShow = true;
  public admins = ['superadmin', 'admin'];
  public categories;
  toggleDisplay(element, text) {
    this.isShow = !this.isShow;
      element.textContent = text;
      element.disabled = true;
  }
  constructor(
    public userService: UserService,
    public productService: ProductService,
    public router: Router,
    public categoryService: CategoryService,
  ) {}

ngOnInit():void{
this.categoryService.getAll()
.subscribe(
  (res)=>{this.categories=res;}
)
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

