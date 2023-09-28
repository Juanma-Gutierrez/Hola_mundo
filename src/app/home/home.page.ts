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
        edad: 52,
        favorito:true
      },
      {
        id: 2,
        nombre: "Robert",
        apellidos: "Baratheon",
        edad: 64,
        favorito:false
      },
      {
        id: 3,
        nombre: "Sansa",
        apellidos: "Stark Lannister",
        edad: 24,
        favorito:true
      }, {
        id: 4,
        nombre: "Cersei",
        apellidos: "Lannister",
        edad: 41,
        favorito:true
      }
    ]

    setInterval(() => {
      if (index < usuarios.length) {
        let miUsuario: User[] = this._users.value
        miUsuario.push(usuarios[index])
        this._users.next(miUsuario)
        index++
      }
    }, 200)
  }

}