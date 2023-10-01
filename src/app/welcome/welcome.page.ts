import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  nombre: string | null = '';

  // Constructor de la página destino Welcome
  constructor(private _route: ActivatedRoute) {
    console.log(this._route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.nombre = this._route.snapshot.paramMap.get('nombre');
    console.log(this.nombre);
  }
}
