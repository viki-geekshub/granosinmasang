import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {
  products;
  constructor(
    public route: ActivatedRoute,
    public productService: ProductService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.productService.searchProducts(params.searchValue)
          .subscribe(
            (res: HttpResponse<any>) => {
              if (!params.searchValue) {
                this.router.navigate(['/notFound']); 
              }
              this.products = res;
            },
            (error: HttpErrorResponse) => console.log(error)
          );
      });
  }

}
