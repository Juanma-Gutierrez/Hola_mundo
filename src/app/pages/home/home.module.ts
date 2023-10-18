import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    // Módulos
    FormsModule,
    SharedModule,
    HomePageRoutingModule,
  ],
  declarations: [
    // Páginas
    HomePage,
  ],
})
export class HomePageModule {}
