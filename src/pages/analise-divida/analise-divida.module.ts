import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnaliseDividaPage } from './analise-divida';

@NgModule({
  declarations: [
    AnaliseDividaPage,
  ],
  imports: [
    IonicPageModule.forChild(AnaliseDividaPage),
  ],
})
export class AnaliseDividaPageModule {}
