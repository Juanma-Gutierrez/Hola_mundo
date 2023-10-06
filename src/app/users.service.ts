import { Injectable } from '@angular/core';
import { User } from './home/user-info/user';
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
          { id: 1, name: 'Juan A.', surname: 'gil Robles', age: 46, fav: true },
          { id: 2, name: 'Eva', surname: 'marcos gómez', age: 45, fav: true },
          { id: 3, name: 'juan', surname: 'de Valencia', age: 4, fav: false },
          { id: 4, name: 'Mª Mar', surname: 'diaz gil', age: 46, fav: true },
          { id: 5, name: 'Lydia', surname: 'mina rojo', age: 11, fav: false },
        ];
        this._users.next(users); // Modifica el BehaviorSubject
        observer.next(users);    // Modifica el observable observer
        observer.complete();     // Completamos el observable observer
      }, 500);
    });
  }
}
