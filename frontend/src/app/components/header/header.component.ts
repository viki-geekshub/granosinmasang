import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { ProductService } from "src/app/services/product.service";
import { Router } from "@angular/router";
import { CategoryService } from "src/app/services/category.service";
// import {MDCIconButtonToggle} from '@material/icon-button';
// const iconToggle = new MDCIconButtonToggle(document.querySelector('.mdc-icon-button'));

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public isShow = true;
  public icon = "search";
  public admins = ["superadmin", "admin"];
  public categories;
  public toggleDisplay() {
    this.isShow = !this.isShow;
    if (this.icon === "search") {
      this.icon = "highlight_off";
    } else {
      this.icon = "search";
    }
  }
  constructor(
    public userService: UserService,
    public productService: ProductService,
    public router: Router,
    public categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((res) => {
      this.categories = res;
    });
  }
  searchProducts(event: any) {
    const searchValue = event.target.search.value;
    this.router.navigate(["/products/search", searchValue]);
  }
  logout() {
    localStorage.removeItem("authToken");
    this.userService.setUser({});
  }
}
