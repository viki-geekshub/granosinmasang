import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public admins = ['superadmin', 'admin'];
  constructor(
    public userService: UserService,
    public productService: ProductService,
    public router: Router
  ) {}

  searchProducts(event: any) {
    const searchValue = event.target.search.value;
    this.router.navigate(['/products/search', searchValue]);
  
    // this.productService
    //   .searchProducts(searchValue)
    //   .subscribe(res => this.productService.setProducts(res));
  }
  logout() {
    localStorage.removeItem('authToken');
    this.userService.setUser({});
  }
}
