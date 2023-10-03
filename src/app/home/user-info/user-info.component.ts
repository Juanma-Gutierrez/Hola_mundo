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
  @Output() onCardClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDeleteClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onFavClick(event: any) {
    this.onFavClicked.emit({
      fav: !(this.usuario?.favorito ?? false),
    });
    event.stopPropagation();
  }

  onCardClick() {
    this.onCardClicked.emit();
  }

  onDeleteClick(event: any) {
    this.onDeleteClicked.emit();
    event.stopPropagation();
  }
}
