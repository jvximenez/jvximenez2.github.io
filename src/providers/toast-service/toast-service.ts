import { Injectable } from '@angular/core';
import { ToastController, Toast } from 'ionic-angular';

/*
  Generated class for the ToastServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastServiceProvider {

  constructor(private toastCtrl: ToastController) {
    console.log('Hello ToastServiceProvider Provider');
  }

  show(msg, duration ) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: duration
    });

    return Toast
  }
  
}
