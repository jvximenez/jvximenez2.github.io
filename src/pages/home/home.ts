import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ConfiguraçõesPage } from '../configura\u00E7\u00F5es/configura\u00E7\u00F5es';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  course = {
    'tittle': '',
    'payload': '',

  };



  constructor(public navCtrl: NavController, public dbService: FirebaseServiceProvider) {

  }


  
  save(course){
    console.log(course);
    this.dbService.save(course);
  }

  NavConfirg(){
    this.navCtrl.push(ConfiguraçõesPage)
  }

}
