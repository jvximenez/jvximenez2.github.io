import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ConfiguraçõesPage } from '../configura\u00E7\u00F5es/configura\u00E7\u00F5es';


/**
 * Generated class for the EditAtalhoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-atalho',
  templateUrl: 'edit-atalho.html',
})
export class EditAtalhoPage {

  public atalho = {
    'title':'',
    'gasto':'',
    'categoria':'',
    'pagamento':'',
  };;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseServiceProvider) {

    this.atalho = this.navParams.get('atalho');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAtalhoPage');
  }

  atualizar(categoria){
    this.firebaseService.update('atalho',categoria).then( d => {
      this.navCtrl.push(ConfiguraçõesPage)});
  }

  deletar(categoria){
    this.firebaseService.revome('atalho',categoria).then( d => {
      this.navCtrl.push(ConfiguraçõesPage)});
  }

}
