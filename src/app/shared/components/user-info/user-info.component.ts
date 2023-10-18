import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../core/interfaces/user';
import { UserInfoFavClicked } from './user-info-fav-clicked';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit{
  @Input() user: User | null = null;
  @Output() onFavClicked: EventEmitter<UserInfoFavClicked> =
    new EventEmitter<UserInfoFavClicked>();
  @Output() onCardClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDeleteClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}
    ngOnInit(): void {}

  onFavClick(event: Event) {
    // Cuando se ejecuta onFavClick emite un fav con el valor true o false correspondiente
    this.onFavClicked.emit({ fav: !(this.user?.fav ?? false) });
    event.stopPropagation();
  }

  onCardClick() {
    // Emite que se ha pulsado la tarjeta
    this.onCardClicked.emit();
  }

  onDeleteClick(event: Event) {
    // Emite que se ha pulsado el botón borrar
    this.onDeleteClicked.emit();
    // También emite para actualizar la lista
    this.onFavClicked.emit();
    event.stopPropagation();
  }
}
