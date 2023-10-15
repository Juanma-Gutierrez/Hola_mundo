import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { UserInfoComponent } from 'src/app/core/pages/home/user-info/user-info.component';
import { UserSmallCardComponent } from 'src/app/core/pages/home/user-info/user-small-card.component';
import { HighlightDirective } from 'src/app/core/directives/highlight.directive';
import { FavsPipe } from 'src/app/core/pipes/favs.pipe';
import { UpperCamelCasePipe } from 'src/app/core/pipes/upper-camel-case.pipe';

@NgModule({
  declarations: [
    // Components
    UserInfoComponent,
    UserSmallCardComponent,
    // Directives
    HighlightDirective,
    // Pipes
    FavsPipe,
    UpperCamelCasePipe,
  ],
  imports: [
    // Modules
    CommonModule,
    IonicModule,
  ],
  exports: [
    // Modules
    CommonModule,
    IonicModule,
    //Components
    UserInfoComponent,
    UserSmallCardComponent,
    //Directives
    HighlightDirective,
    //Pipes
    FavsPipe,
    UpperCamelCasePipe,
  ],
})
export class SharedModule {}
