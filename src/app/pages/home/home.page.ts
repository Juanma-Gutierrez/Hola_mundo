import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { FavoriteService } from '../../core/services/favorite.service';
import { User } from '../../core/interfaces/user';
import { IonModal, ToastController, ToastOptions } from '@ionic/angular';
import { zip } from 'rxjs';
import { UserInfoFavClicked } from '../../shared/components/user-info/user-info-fav-clicked';
import { Router } from '@angular/router';
import { UpperCamelCasePipe } from 'src/app/shared/pipes/upper-camel-case.pipe';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modal?: IonModal;
  loading = true;
  filteredUsers: User[] = [];
  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name?: string;

  constructor(
    private toast: ToastController,
    public usersService: UsersService,
    public favoriteService: FavoriteService,
    private router: Router
  ) {
    this.usersService.users$.subscribe((users) => {
      // Filtrar los usuarios con el atributo 'fav' como true.
      this.filteredUsers = users.filter((user) => user.fav === true);
    });
  }

  ngOnInit(): void {
    // Carga los usuarios del servicio en this.users, cuando la suscripción
    // recibe los datos modifica el valor de loading a falso
    this.loading = true;
    zip(this.usersService.getAll(), this.favoriteService.getAll()).subscribe(
      () => {
        this.loading = false;
        console.log("ruta de la foto: " );
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
          message: `User ${user.name.toUpperCase()} ${user.surname.toUpperCase()} ${
            event.fav ? 'added to' : 'removed from'
          } favourites`,
          duration: 1000,
          position: 'bottom',
          color: event.fav ? 'success' : 'danger',
        };
        this.toast.create(options).then((toast) => toast.present());
      },
      error: (err) => console.log('Error en onFavClicked' + err),
    });
  }

  onFavSmallCardClicked(id: number) {
    var myUser: User;
    this.usersService.getUser(id).subscribe((user) => (myUser = user));
    this.onFavClicked(myUser!, { fav: false });
  }

  async onCardClicked(user: User) {
    console.log('onCardClicked');
    const json = JSON.stringify(user);
    this.router.navigate(['/welcome', { id: json }]);
  }

  onDeleteClicked(user: User) {
    console.log('onDeleteClicked');
    var _user: User = { ...user };
    this.usersService.deleteUser(_user).subscribe({
      next: () => {
        //Notificamos con un Toast que se ha pulsado
        const options: ToastOptions = {
          message:
            `User ` +
            user.name.toUpperCase() +
            ' ' +
            user.surname.toUpperCase() +
            ` deleted`, //mensaje del toast
          duration: 1000, // 1 segundo
          position: 'bottom', // el toast se situa en la parte inferior
          color: 'danger', // color del toast
        };
        //creamos el toast
        this.toast.create(options).then((toast) => toast.present());
      },
      error: (err: any) => {
        console.log('Error en onDeleteClicked' + err);
      },
    });
  }

  filterFavourites(user: any): boolean {
    return user.fav === true;
  }
}
