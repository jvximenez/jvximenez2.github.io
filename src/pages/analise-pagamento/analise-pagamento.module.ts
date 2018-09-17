import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnalisePagamentoPage } from './analise-pagamento';

@NgModule({
  declarations: [
    AnalisePagamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(AnalisePagamentoPage),
  ],
})
export class AnalisePagamentoPageModule {}
