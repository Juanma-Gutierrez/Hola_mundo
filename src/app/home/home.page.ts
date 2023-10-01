import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfoFavClicked } from './user-info-fav-clicked';
import { Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this._users.asObservable();

  constructor(private router: Router, private toast: ToastController) {}

  public onFavClicked(user: User, event: UserInfoFavClicked) {
    // recibimos en user el usuario asociado a la tarjeta
    // recibimos en event un objeto del tipo UserInfoFavClicked que tiene una propiedad fav que indica si hay que añadir o eliminar de la lista de favoritos
    // creamos una copia del array actual de usuarios
    const users = [...this._users.value];
    // buscamos el índice del usuario para modificar su propiedad fav
    var index = users.findIndex((_user) => _user.id == user.id);
    if (index != -1)
      // actualizamos la propiedad fav con el valor que hemos recibido por el evento
      users[index].favorito = event.fav ?? false; // en el caso de que fav sea undefined devolvemos falso.
    // notificamos un nuevo array de usuarios para que se renderice en la plantilla
    this._users.next([...users]);
    // Notificamos con un Toast que se ha pulsado
    const options: ToastOptions = {
      message: `${users[index].nombre} ${users[index].apellidos} ${
        event.fav ? 'added' : 'removed'
      } ${event.fav ? 'to' : 'from'} favourites`, //mensaje del toast
      duration: 1000,                             // 1 segundo
      position: 'bottom',                         // el toast se situa en la parte inferior
      color: event.fav ? 'success' : 'danger',    // color del toast, verde si pone fav y rojo si quita fav
      cssClass: 'fav-ion-toast',                  // Clase que podemos poner en global.scss para configurar el ion-toast
    };

    // creamos el toast y lo presentamos (es una promesa por eso el then)
    this.toast.create(options).then((toast) => toast.present());
  }

  ngOnInit(): void {
    let index = 0;
    let usuarios: User[] = [
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

    setInterval(() => {
      if (index < usuarios.length) {
        let miUsuario: User[] = this._users.value;
        miUsuario.push(usuarios[index]);
        this._users.next(miUsuario);
        index++;
      }
    }, 200);
  }
}
