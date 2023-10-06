import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FavoriteService } from '../favorite.service';
import { User } from './user-info/user';
import { ToastController, ToastOptions } from '@ionic/angular';
import { zip } from 'rxjs';
import { UserInfoFavClicked } from './user-info/user-info-fav-clicked';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loading = true;
  constructor(
    private toast: ToastController,
    public usersService: UsersService,
    public favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Cargo los usuarios del servicio en this.users, cuando la suscripción
    // recibe los datos modifica el valor de loading a falso
    this.loading = true;
    zip(this.usersService.getAll(), this.favoriteService.getAll()).subscribe(
      () => {
        this.loading = false;
      }
    );
    this.favoriteService.getAll().subscribe();
  }

  onFavClicked(user: User, event: UserInfoFavClicked) {
    console.log('onFavClicked');
    var observable = event?.fav
      ? this.favoriteService.addFavorite(user.id)
      : this.favoriteService.deleteFavorite(user.id);
    observable.subscribe({
      next: (_) => {
        const options: ToastOptions = {
          message: `User ${user.name} ${user.surname} ${
            event.fav ? 'added to' : 'removed from'
          } favourites`,
          duration: 1000,
          position: 'bottom',
          color: event.fav ? 'success' : 'danger',
        };
        this.toast.create(options).then((toast) => toast.present());
      },
      error: (err) => console.log(err),
    });
  }

  async onCardClicked(user: User) {
    console.log('onCardClicked');
    const json = JSON.stringify(user);
    this.router.navigate(['/welcome', { id: json }]);
  }

  onDeleteClicked(user: User) {
    console.log('onDeleteClicked');
  }
}
