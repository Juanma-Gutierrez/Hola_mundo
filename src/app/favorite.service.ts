import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Fav } from './home/user-info/fav';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private _favs: BehaviorSubject<Fav[]> = new BehaviorSubject<Fav[]>([]);
  public favs$: Observable<Fav[]> = this._favs.asObservable();

  constructor() {}

  getAll(): Observable<Fav[]> {
    // observer es el observable que va a devolver la función getAll()
    return new Observable((observer) => {
      setTimeout(() => {
        var favs = [{ id: 1 }, { id: 3 }, { id: 5 }];
        this._favs.next(favs); // Modifica el BehaviorSubject
        observer.next(favs); // Modifica el observable observer
        observer.complete(); // Completamos el observable observer
      }, 500);
    });
  }

  addFavorite(uid: number): Observable<Fav> {
    return new Observable((observer) => {
      let _favs = [...this._favs.value]; // hace una copia del array
      let _fav = { id: uid }; // Añade uid al elemento _fav
      console.log(_favs.length);
      _favs.push(_fav); // Añade _fav al nuevo array de favoritos
      this._favs.next(_favs); // Añado el nuevo array al behaviorsubject _favs
      observer.next(_fav); // Comunica el cambio en el favorito
      observer.complete(); // Cierra el observable
    });
  }

  deleteFavorite(uid: number): Observable<Fav> {
    return new Observable((observer) => {
      let _favs = [...this._favs.value]; // copia el array
      // Guarda en index la posición en la que fav.id = uid pasado por param.
      var index = _favs.findIndex((fav) => fav.id == uid);
      if (index < 0) {
        // si la posición  es inferior a 0
        observer.error(console.log('rror en el id'));
      } else {
        // Recorta de _favs el elemento en la posición index
        _favs = [..._favs.slice(0, index), ..._favs.slice(index + 1)];
        this._favs.next(_favs); // Añado el cambio en _favs
        observer.next({ id: uid }); // Comunico el cambio indicando el id borrado
      }
      observer.complete(); // Cierra el observador
    });
  }
}
