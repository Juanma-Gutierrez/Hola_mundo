import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'primeraLetraApellido'
})
export class PrimeraLetraApellidoPipe implements PipeTransform {
    
  transform(apellido?: string): string {
    if (apellido && apellido.length > 0) {
      return apellido[0].toUpperCase() + ".";
    } else {
      return '';
    }
  }
}