import { Injectable } from '@angular/core';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // _users permite modificar el observable
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // users$ es el observable de _userss
  public users$: Observable<User[]> = this._users.asObservable();

  constructor() {}

  getAll(): Observable<User[]> {
    // observer es el observable que va a devolver la función getAll()
    return new Observable((observer) => {
      setTimeout(() => {
        var users = [
          { id: 1, name: 'Cersei', surname: 'Lannister', age: 46, fav: false },
          { id: 2, name: 'EDDAR', surname: 'stark', age: 58, fav: false },
          { id: 3, name: 'sansa', surname: 'Stark', age: 21, fav: false },
          { id: 4, name: 'jon', surname: 'Nieve', age: 24, fav: false },
          { id: 5, name: 'Hodor', surname: 'Hodor', age: 48, fav: false },
          { id: 6, name: 'Tyrion', surname: 'Lannister', age: 46, fav: false },
          { id: 7, name: 'Jaime', surname: 'Lannister', age: 42, fav: false },
          { id: 8, name: 'Catlyn', surname: 'Tully', age: 47, fav: false },
          {
            id: 9,
            name: 'Danaerys',
            surname: 'reina de dragones',
            age: 18,
            fav: false,
          },
          { id: 10, name: 'Gusano', surname: 'gris', age: 26, fav: false },
        ];
        this._users.next(users); // Modifica el BehaviorSubject
        observer.next(users); // Modifica el observable observer
        observer.complete(); // Completamos el observable observer
      }, 500);
    });
  }

  public deleteUser(user: User): Observable<User[]> {
    return new Observable((observer) => {
      var users = [...this._users.value];
      var index = users.findIndex((u) => u.id == user.id);
      if (index < 0) {
        observer.error('Error');
      } else {
        users = [...users.slice(0, index), ...users.slice(index + 1)];
        this._users.next(users);
        observer.next(users);
      }
      observer.complete();
    });
  }

  getUser(id: number): User {
    // Localizamos el usuario pasado por parámetro
    var index = this._users.value.findIndex((u) => u.id == id);
    // Devolvemos el usuario localizado por el índice
    return this._users.value[index];
  }
}
