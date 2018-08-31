import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfiguraçõesPage } from '../configura\u00E7\u00F5es/configura\u00E7\u00F5es';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
/**
 * Generated class for the EditConfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-conf',
  templateUrl: 'edit-conf.html',

})
export class EditConfPage {
  categoria = {
    'title':'',
    'numero':'',
    'icon':'',
  };
  pagamento = {
    'title':'',
    'numero':'',
    'icon':'',
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseServiceProvider) {
  this.categoria = this.navParams.get('categoria');
  this.pagamento =  this.navParams.get('pagamento');
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditConfPage');
  }

  atualizar(categoria){
    this.firebaseService.update('categoria',categoria).then( d => {
      this.navCtrl.push(ConfiguraçõesPage)});
  }

  deletar(categoria){
    this.firebaseService.revome('categoria',categoria).then( d => {
      this.navCtrl.push(ConfiguraçõesPage)});
  }

}
