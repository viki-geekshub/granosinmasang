import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array:Array<any>): Array<any> { // Este pipe transforma un array en otro array ordenado
    return array?.sort(function(a,b){return (a.code-b.code);}); // Pongo la interrogación para decirle qeu si no hay nada que mostrar, que no haga nada. Es para darle caracter de "opcional" y que no de error cuando resulte ser undefined
  }
  // Sirve para ordenar de menor a mayor las listas en un orden númerico de menos a mas
// Se ordena mediante el metodo sort que tiene dentro una función con dos parametros que nos devuelve el array ordenado de menor a mayor según el codigo.
}
