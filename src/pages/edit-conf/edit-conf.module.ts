import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditConfPage } from './edit-conf';

@NgModule({
  declarations: [
    EditConfPage,
  ],
  imports: [
    IonicPageModule.forChild(EditConfPage),
  ],
})
export class EditConfPageModule {}
