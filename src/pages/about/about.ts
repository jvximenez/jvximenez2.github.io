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
  public soma;

  constructor(public navCtrl: NavController, public dbService: FirebaseServiceProvider) {

    this.course = this.dbService.getAll();
    this.soma = this.somando();
    

    

  }

  goToSingle(course) {
    console.log(course.tittle);
    console.log(course.key);
    this.navCtrl.push(EditPage, 
    {'course' : course});
  }

  somando() {
    this.course = this.dbService.getAll();
    this.soma = 0;
    this.course.forEach(course => {course.forEach(course2 => {this.soma += Number(course2.payload), console.log(course2.payload, this.soma)})});
        console.log("oi");
        console.log(this.soma)
        return (this.soma);
        
  }

  somando2(){
    this.course = this.dbService.getAll();
    this.soma = 0;
    this.course.forEach(course => {course.forEach(course2 => {if(course2.tittle == "Gremio"){return (this.soma += Number(course2.payload)), console.log(course2.payload, this.soma)}})});
        console.log("oi");
        console.log(this.soma)
        return (this.soma);
        
  }
    
    
  

}
