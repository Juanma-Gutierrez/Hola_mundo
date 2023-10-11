import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from './user';
import { UserInfoFavClicked } from './user-info-fav-clicked';
import { FavoriteService } from '../favorite/favorite.service';
import { UsersService } from './users.service';

@Component({
  selector: 'app-user-small-card',
  templateUrl: './user-small-card.component.html',
  styleUrls: ['./user-small-card.component.scss'],
})
export class UserSmallCardComponent implements OnInit {
  public user!: User;
  @Input() id: number = -1;
  @Output() onFavClicked: EventEmitter<UserInfoFavClicked> =
    new EventEmitter<UserInfoFavClicked>();
  constructor(
    public favoriteService: FavoriteService,
    public usersService: UsersService
  ) {}

  ngOnInit() {
    this.user = this.usersService.getUser(this.id);
  }

  onDeleteFavClick(event: Event) {
    console.log('onDeleteFavClick' + this.user);
    console.log('onDeleteFavClick' + event);
    // Cuando se ejecuta onFavClick emite un fav con el valor true o false correspondiente
    this.onFavClicked.emit({ fav: !(this.user?.fav ?? false) });
    this.favoriteService.getAll();
    // event.stopPropagation();
  }
}
