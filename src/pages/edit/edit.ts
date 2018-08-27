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

  course = {
    'tittle': '',
    'payload': '',

  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseServiceProvider) {
    this.course = this.navParams.get('course');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  update(course){
    this.firebaseService.update(course);
  }

  remove(course){
    this.firebaseService.revome(course).then( d => {
      this.navCtrl.push(AboutPage)});
  }
}
