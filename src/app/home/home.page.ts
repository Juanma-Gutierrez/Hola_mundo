import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuarios = [{
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
  constructor() {}

}