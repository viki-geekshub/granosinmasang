import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private subcategories: object[];
  constructor(public httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/subcategories');
  }
  setSubCatLegumbres(subcategories): void { // Me pone solo las subcategorías de la categoría Legumbres
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===1);
  }
  setSubCatArroces(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===2);
  }
  setSubCatHarinas(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===3);
  }
  setSubCatSemolas(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===4);
  }
  setSubCatPasta(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===5);
  }
  setSubCatCereales(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===6);
  }
  setSubCatFrutosSecos(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===7);
  }
  setSubCatFrutasDeshidratadas(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===8);
  }
  setSubCatEspecias(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===9);
  }
  setSubCatSalesAzucares(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===10);
  }
  setSubCatCafe(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===11);
  }
  setSubCatChocolate(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===12);
  }
  setSubCatSemillas(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===14);
  }
  setSubCatSuperalimentosPotenciadores(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===15);
  }
  setSubCatTeFlores(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===16);
  }
  setSubCatSetasDeshidratadas(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===17);
  }

  // getSubcategories(): object[] {
  //   return this.subcategories;
  // }
  
  // searchSubcategories(search) {
  //   return this.httpClient.get('http://localhost:3000/subcategories/name/' + search);
  // }
}
