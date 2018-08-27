import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

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

}
