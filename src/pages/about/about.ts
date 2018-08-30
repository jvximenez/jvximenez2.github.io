import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { EditPage } from '../edit/edit';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public compras;
  public soma;

  constructor(public navCtrl: NavController, public dbService: FirebaseServiceProvider) {

    this.compras = this.dbService.getAll();
    this.soma = this.somando();
    

    

  }

  goToSingle(compras) {
    console.log(compras.title);
    console.log(compras.key);
    this.navCtrl.push(EditPage, 
    {'compras' : compras});
  }

  somando() {
    this.compras = this.dbService.getAll();
    this.soma = 0;
    this.compras.forEach(compras => {compras.forEach(compra2 => {this.soma += Number(compra2.payload), console.log(compra2.payload, this.soma)})});
        console.log("oi");
        console.log(this.soma)
        return (this.soma);
        
  }

  somando2(){
    this.compras = this.dbService.getAll();
    this.soma = 0;
    this.compras.forEach(compras => {compras.forEach(compras2 => {if(compras2.title == "Gremio"){return (this.soma += Number(compras2.payload)), console.log(compras2.payload, this.soma)}})});
        console.log("oi");
        console.log(this.soma)
        return (this.soma);
        
  }
  
  remover(key){
    this.dbService.revome(key).then( d => {console.log("removido")});
  }
    
  

}
