import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodasAsComprasPage } from './todas-as-compras';

@NgModule({
  declarations: [
    TodasAsComprasPage,
  ],
  imports: [
    IonicPageModule.forChild(TodasAsComprasPage),
  ],
})
export class TodasAsComprasPageModule {}
