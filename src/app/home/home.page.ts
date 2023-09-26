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
      nombre: "Eddar",
      apellidos: "Stark",
      edad: 52
    },
    {
      nombre: "Robert",
      apellidos: "Baratheon",
      edad: 64
    },
    {
        nombre:"Sansa",
        apellidos: "Stark Lannister",
        edad:24
    },{
        
        nombre:"Cersei",
        apellidos:"Lannister",
        edad:41
    }
  ]
  constructor() {}

}