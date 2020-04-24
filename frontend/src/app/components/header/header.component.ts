import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
// import { SubcategoryService } from 'src/app/services/subcategory.service'; // No se utiliza

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  public admins = ['superadmin', 'admin'];
  public categories;
  // public subcategories;  // No se utiliza
  constructor(
    public userService: UserService,
    public productService: ProductService,
    public router: Router,
    public categoryService: CategoryService,
    // public subcategoryService: SubcategoryService  // No se utiliza
  ) {}

ngOnInit():void{
this.categoryService.getAll()
.subscribe(
  (res)=>{this.categories=res;}
)
// this.subcategoryService.getAll()  // Esta llamada no se utiliza en principio para nada en el header. Se puso para probar
// .subscribe(
//   (res)=>{this.subcategories=res;}
// )
}
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
