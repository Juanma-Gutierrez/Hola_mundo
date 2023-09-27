import {
  Component,
  OnInit
} from '@angular/core';
import {
  User
} from './user';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private _users: BehaviorSubject < User[] > = new BehaviorSubject < User[] > ([]);
  users$: Observable < User[] > = this._users.asObservable();




  constructor() {}
  ngOnInit(): void {
    let index = 0;
    let usuarios: User[] = [{
        id: 1,
        nombre: "Eddar",
        apellidos: "Stark",
        edad: 52
      },
      {
        id: 2,
        nombre: "Robert",
        apellidos: "Baratheon",
        edad: 64
      },
      {
        id: 3,
        nombre: "Sansa",
        apellidos: "Stark Lannister",
        edad: 24
      }, {
        id: 4,
        nombre: "Cersei",
        apellidos: "Lannister",
        edad: 41
      }
    ]

    setInterval(() => {
      if (index < usuarios.length) {
        let miUsuario: User[] = this._users.value
        miUsuario.push(usuarios[index])
        this._users.next(miUsuario)
        index++
      }
    }, 1000)
  }

}