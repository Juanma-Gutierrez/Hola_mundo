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
          {
            id: 1,
            name: 'Juan A.',
            surname: 'gil Robles',
            age: 46,
            fav: false,
          },
          { id: 2, name: 'EVA', surname: 'marcos gómez', age: 45, fav: false },
          { id: 3, name: 'juan', surname: 'de Valencia', age: 4, fav: false },
          { id: 4, name: 'Mª Mar', surname: 'diaz gil', age: 46, fav: false },
          { id: 5, name: 'Lydia', surname: 'mina rojo', age: 11, fav: false },
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
