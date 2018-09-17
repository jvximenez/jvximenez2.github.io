import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddPrevisãoPage } from '../add-previs\u00E3o/add-previs\u00E3o';

/**
 * Generated class for the PrevisãoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-previsão',
  templateUrl: 'previsão.html',
})
export class PrevisãoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrevisãoPage');
  }


  novaPrev(){
    this.navCtrl.push(AddPrevisãoPage)
  }

}
