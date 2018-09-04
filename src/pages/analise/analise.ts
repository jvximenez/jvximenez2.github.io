import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AnalisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-analise',
  templateUrl: 'analise.html',
})
export class AnalisePage {

  teste = {
    'categoria 1' : [4.5],
    'categoria 2' : [4.5],
    'categoria 3' : [4.5],
    'categoria 4' : [4.5],
    'mes':"9",
    'ano':'2018',
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnalisePage');
  }


  

}
