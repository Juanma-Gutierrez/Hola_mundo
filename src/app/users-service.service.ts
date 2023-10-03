import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './home/user';

export interface UserInterface {
  getAll(): Observable<User[]>;
  getUser(user: User): Observable<User>;
  updateUser(user: User): Observable<User>;
  deleteUser(user: User): Observable<User>;
  deleteAll(): Observable<void>;
}

export class UserNotFoundException extends Error {
  // . declare any additional properties or methods .
}

@Injectable({
  providedIn: 'root',
})
export class UsersService implements UserInterface {
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this._users.asObservable();

  constructor() {}
  getAll(): Observable<User[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        var users: User[] = [
          {
            id: 1,
            nombre: 'Eddar',
            apellidos: 'Stark',
            edad: 52,
            favorito: true,
          },
          {
            id: 2,
            nombre: 'Robert',
            apellidos: 'Baratheon',
            edad: 64,
            favorito: false,
          },
          {
            id: 3,
            nombre: 'Sansa',
            apellidos: 'Stark Lannister',
            edad: 24,
            favorito: true,
          },
          {
            id: 4,
            nombre: 'Cersei',
            apellidos: 'Lannister',
            edad: 41,
            favorito: true,
          },
        ];
        this._users.next(users);
        observer.next(users);
        observer.complete();
      });
    });
  }

  getUser(user: User): Observable<User> {
    return new Observable((observer) => {});
  }

  updateUser(user: User): Observable<User> {
    return new Observable((observer) => {
      var _users = [...this._users.value];
      var index = _users.findIndex((u) => u.id == user.id);
      if (index < 0) observer.error(new UserNotFoundException());
      else {
        _users[index] = user;
        observer.next(user);
        this._users.next(_users);
      }
      observer.complete();
    });
  }

  deleteUser(user: User): Observable<User> {
    return new Observable((observer) => {
      var _users = [...this._users.value];
      var index = _users.findIndex((u) => u.id == user.id);
      if (index < 0) observer.error(new UserNotFoundException());
      else {
        _users = [..._users.slice(0, index), ..._users.slice(index + 1)];
        this._users.next(_users);
        observer.next(user);
      }
      observer.complete();
    });
  }

  deleteAll(): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
