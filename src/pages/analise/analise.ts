import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

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

  public categorias;
  public compras;
  public visual;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService: FirebaseServiceProvider) {
    this.categorias = this.dbService.getArray('categoria')
    this.compras = this.dbService.getAll('compras')
    this.visual = this.dbService.getAll('visual')

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnalisePage');
  }


  

}
