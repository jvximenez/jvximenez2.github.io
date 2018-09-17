import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnaliseCategoriaPage } from './analise-categoria';

@NgModule({
  declarations: [
    AnaliseCategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(AnaliseCategoriaPage),
  ],
})
export class AnaliseCategoriaPageModule {}
