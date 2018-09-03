import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AboutPage } from '../about/about';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  compras = {
    'title': '',
    'payload': '',
    'categoria':'',
    'pagamento': '',
    'data': '',

  };
  
  private categorias;
  private pagamentos;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseServiceProvider) {
    this.compras = this.navParams.get('compras');
    this.categorias = this.firebaseService.getArray('categoria')
    this.pagamentos = this.firebaseService.getArray('pagamento')
    console.log(this.compras)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  update(compras){
    this.firebaseService.update('compras',compras).then( d => {
      this.navCtrl.push(AboutPage)});
  }

  remove(compras){
    this.firebaseService.revome('compras',compras).then( d => {
      this.navCtrl.push(AboutPage)});
  }
}
