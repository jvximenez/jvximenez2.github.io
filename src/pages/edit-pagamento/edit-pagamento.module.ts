import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPagamentoPage } from './edit-pagamento';

@NgModule({
  declarations: [
    EditPagamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPagamentoPage),
  ],
})
export class EditPagamentoPageModule {}
