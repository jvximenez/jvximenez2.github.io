import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';


/**
 * Generated class for the AnaliseCategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-analise-categoria',
  templateUrl: 'analise-categoria.html',
  
})
export class AnaliseCategoriaPage {

  dataEnviada;
  categoriaEnviada;
  public compras;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService: FirebaseServiceProvider) {
    this.compras = this.navParams.get('compras')
    this.dataEnviada = this.navParams.get('data')
    this.categoriaEnviada = this.navParams.get('categoria')
    console.log('ola,', this.dataEnviada, this.compras, this.categoriaEnviada)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnaliseCategoriaPage');
  }

}
