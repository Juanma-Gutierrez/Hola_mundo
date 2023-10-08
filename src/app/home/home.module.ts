import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { FavsPipe } from '../favs.pipe';
import { HighlightDirective } from '../directive/highlight.directive';
import { UpperCamelCasePipe } from '../pipes/upper-camel-case.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    UserInfoComponent,
    FavsPipe,
    HighlightDirective,
    UpperCamelCasePipe,
  ],
})
export class HomePageModule {}
