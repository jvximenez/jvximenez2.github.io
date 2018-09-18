import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GraficosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graficos',
  templateUrl: 'graficos.html',
})
export class GraficosPage {
  public compras;
  public data;
  public previsao


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.compras = this.navParams.get('compras')
    this.data = this.navParams.get('data')
    this.previsao = this.navParams.get('previsao')

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GraficosPage');
  }

}
