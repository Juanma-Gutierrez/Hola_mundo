import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCamelCase',
})
export class UpperCamelCasePipe implements PipeTransform {
    transform(fullName?: string, ...args: unknown[]): string {
        return fullName!
          .split(' ') // Separa fullName por espacios
          // Mapea la cadena recorriendo cada elemento y poniendo la primera letra
          // de cada palabra mayúscula y el resto de la palabra en minúsculas
          .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
          // Une la cadena con espacios intermedios
          .join(' ');
      }
}
