import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { FavsPipe } from '../../pipes/favs.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { UpperCamelCasePipe } from '../../pipes/upper-camel-case.pipe';
import { UserSmallCardComponent } from './user-info/user-small-card.component';

@NgModule({
  imports: [
    // Módulos
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
],
  declarations: [
    // Componentes
    UserInfoComponent,
    UserSmallCardComponent,
    // Páginas
    HomePage,
    // Pipes
    FavsPipe,
    UpperCamelCasePipe,
    // Directivas
    HighlightDirective,
  ],
})
export class HomePageModule {}
