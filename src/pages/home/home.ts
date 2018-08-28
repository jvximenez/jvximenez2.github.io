import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ConfiguraçõesPage } from '../configura\u00E7\u00F5es/configura\u00E7\u00F5es';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  compras = {
    'title': '',
    'payload': '',
    'categoria':'',
    'pagamento': '',

  };



  constructor(public navCtrl: NavController, public dbService: FirebaseServiceProvider) {

  }


  
  save(compras){
    console.log(compras);
    this.dbService.save(compras);
  }

  NavConfirg(){
    this.navCtrl.push(ConfiguraçõesPage)
  }

}
