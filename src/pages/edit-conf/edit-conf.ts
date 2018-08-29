import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  categorias = {
    'title':'',
    'numero':'',
    'icon':'',
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.categorias = this.navParams.get('categorias');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditConfPage');
  }

}
