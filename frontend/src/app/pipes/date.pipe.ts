import { Pipe, PipeTransform } from '@angular/core';

@Pipe({  // Así es como voy a llamar a este pipe donde lo necesite
  name: 'dateEsp'
})
export class DatePipe implements PipeTransform {

  transform(date: string): string {
    const fecha = date?.split(/[- T :]/).slice(0,3).join("-"); 
    const hora = date?.split(/[- T :]/).slice(3,5).join(":");
    const fechaHora = fecha + ', ' + hora;
    return fechaHora;

  }

}
// Le estoy diciendo aquí que me ponga la fecha así: 2020-04-03, 22:25
// Para ello uso dos funciones por separado para darle formato a la fecha por un lado y a la hora por otro
// En la función transform llamo a la variable date y le digo que es un string y que me va a devolver otro string
// Creo tres contantes. 
// El split es para borrrar elementos concretos (los que aparecen entre los corchetes [])
// El slice es para acortarlo, le digo que quiero solo los indices 0, 1 y 2 (los tres primeros, con el último incluido)
// El join es para volver a unir estos indices, porque los quiero separados por guiones.