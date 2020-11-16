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
  setSubCatArroces(subcategories): void { // Me pone solo las subcategorías de la categoría Arroces
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===1);
  }
  setSubCatSemillas(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===2);
  }
  setSubCatCafes(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===3);
  }
  setSubCatChocolates(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===4);
  }
  setSubCatEspecias(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===5);
  }
  setSubCatSalesAzucares(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===6);
  }
  setSubCatFrutasDeshidratadas(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===7);
  }
  setSubCatFrutosSecos(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===8);
  }
  setSubCatHarinas(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===9);
  }
  setSubCatCereales(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===10);
  }
  setSubCatLegumbres(subcategories): void { 
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===11);
  }
  setSubCatPastas(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===12);
  }
  setSubCatSemolas(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===13);
  }
  setSubCatSetasDeshidratadas(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===14);
  }
  setSubCatSuperalimentosPotenciadores(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===15);
  }
  setSubCatTesFlores(subcategories): void {
    this.subcategories = subcategories;
    this.subcategories = this.subcategories.filter(item=>item['CategoryId']===16);
  }
  
  // getSubcategories(): object[] {
  //   return this.subcategories;
  // }
  
  // searchSubcategories(search) {
  //   return this.httpClient.get('http://localhost:3000/subcategories/name/' + search);
  // }
}
