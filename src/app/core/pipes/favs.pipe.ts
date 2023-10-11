import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../pages/home/user-info/user';
import { Fav } from '../pages/home/favorite/fav';

@Pipe({
  name: 'favs',
})
export class FavsPipe implements PipeTransform {
  transform(users: User[] | null, favs: Fav[] | null): User[] {
    // Recibe el array de usuarios y el array de favoritos
    // Crea una copia del array de usuarios pasado por parámetro
    let _users = [...(users ?? [])];
    // Realiza un mapeo de cada usuario grabándolo en _users
    _users = _users.map((u) => {
      return {
        id: u.id,
        name: u.name,
        surname: u.surname,
        age: u.age,
        // en fav graba true si encuentra el id del usuario
        // p es previo, f es favorito
        fav: favs?.reduce((p, f) => p || f.id == u.id, false) ?? false,
      };
    });
    return _users;
  }
}
