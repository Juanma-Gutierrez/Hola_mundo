import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user';
import { UserInfoFavClicked } from '../user-info-fav-clicked';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() usuario?: User | null;
  @Output() onFavClicked: EventEmitter<UserInfoFavClicked> =
    new EventEmitter<UserInfoFavClicked>();

  constructor() {}

  ngOnInit() {}
  onFavClick(event?: any) {
    this.onFavClicked.emit({
      fav: !(this.usuario?.favorito ?? false), // Devolvemos el estado contrario al que tenemos
    });
    event.stopPropagation();
    // if (this.usuario) this.usuario.favorito = !this.usuario?.favorito;
  }
}
