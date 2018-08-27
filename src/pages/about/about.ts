import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { EditPage } from '../edit/edit';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public course;

  constructor(public navCtrl: NavController, public dbService: FirebaseServiceProvider) {

    this.course = this.dbService.getAll();
    
    

  }

  goToSingle(course) {
    console.log(course.tittle);
    console.log(course.key);
    this.navCtrl.push(EditPage, 
    {'course' : course});
  }

}
