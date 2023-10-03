import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from './user';
import { UserInfoFavClicked } from './user-info-fav-clicked';
import { Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import { UsersService } from '../users-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public loading: boolean = false;

  constructor(
    private router: Router,
    private toast: ToastController,
    public users: UsersService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.users.getAll().subscribe((users) => {
      this.loading = false;
    });
  }
  public onFavClicked(user: User, event: UserInfoFavClicked) {
    var _user: User = { ...user };
    _user.favorito = event.fav ?? false;
    this.users.updateUser(_user).subscribe({
      next: (user) => {
        const options: ToastOptions = {
          message: `${_user.nombre} ${_user.apellidos} ${
            event.fav ? 'added' : 'removed'
          } ${event.fav ? 'to' : 'from'} favourites`,
          duration: 1000,
          position: 'bottom',
          color: event.fav ? 'success' : 'danger',
          cssClass: 'fav-ion-toast',
        };

        this.toast.create(options).then((toast) => toast.present());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public onDeleteClicked(user: User) {
    var _user: User = { ...user };

    this.users.deleteUser(_user).subscribe({
      next: (user) => {
        const options: ToastOptions = {
          message: ` ${_user.nombre} ${_user.apellidos} deleted`,
          duration: 1000,
          position: 'bottom',
          color: 'danger',
          cssClass: 'fav-ion-toast',
        };
        this.toast.create(options).then((toast) => toast.present());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public async onCardClicked() {
    const options: ToastOptions = {
      message: 'User clicked the card',
      duration: 1000,
      position: 'bottom',
      color: 'tertiary',
      cssClass: 'card-ion-toast',
    };
    const toast = await this.toast.create(options);
    toast.present();
  }
}
