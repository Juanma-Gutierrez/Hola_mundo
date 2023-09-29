import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from '../user';

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
    if (this.usuario) this.usuario.favorito = !this.usuario?.favorito;
  }
}
