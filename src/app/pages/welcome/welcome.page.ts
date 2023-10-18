import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import { User } from '../../core/interfaces/user';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  @Input() public user!: User;

  activatedRoute?: ActivatedRoute;

  constructor(
    private router: Router,
    private toast: ToastController,
    activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute = activatedRoute;
  }

  async ngOnInit() {
    if (this.activatedRoute) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.user = JSON.parse(id!);
      const options: ToastOptions = {
        message:
          'Welcome ' +
          this.user.name.toUpperCase() +
          ' ' +
          this.user.surname.toUpperCase(),
        duration: 2000,
        position: 'bottom',
        color: 'tertiary',
      };
      const toast = await this.toast.create(options);
      toast.present();
    }
  }
}
