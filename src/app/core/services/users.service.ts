import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // _users permite modificar el observable
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // users$ es el observable de _userss
  public users$: Observable<User[]> = this._users.asObservable();

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    // observer es el observable que va a devolver la función getAll()
    // URL_BASE está definida en environment
    return this.http.get<User[]>(environment.URL_BASE + 'users').pipe(
      tap((result) => {
        this._users.next(result);
      })
    );
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

  getUser(id: number): Observable<User> {
    return new Observable((observer) => {
      // Localizamos el usuario pasado por parámetro
      var index = this._users.value.findIndex((u) => u.id == id);
      // Devolvemos el usuario localizado por el índice
      observer.next(this._users.value[index]);
      observer.complete();
    });
  }
}
