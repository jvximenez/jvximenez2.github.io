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
  public comidas;
  public soma;
  public categorias;

  public visual;
  public ordem;

  constructor(public navCtrl: NavController, public dbService: FirebaseServiceProvider) {

    this.compras = this.dbService.getAll('compras');
    this.soma = this.somando();
    this.comidas = this.comidinha();
    this.categorias = this.dbService.getArray('categoria')
    this.visual = this.visualOrdem()
    console.log(this.visual,"olha aqui")

    

    

  }

  goToSingle(compras) {
    this.navCtrl.push(EditPage, 
    {'compras' : compras});
  }

  somando() {
    this.compras = this.dbService.getAll('compras');
    this.soma = 0;
    this.compras.forEach(compras => {compras.forEach(compra2 => {this.soma += Number(compra2.payload), console.log(compra2.payload, this.soma)})});
        
        console.log(this.soma)
        return (this.soma);
        
  }

  somando2(){
    this.compras = this.dbService.getAll('compras');
    this.soma = 0;
    this.compras.forEach(compras => {compras.forEach(compras2 => {if(compras2.title == "Gremio"){return (this.soma += Number(compras2.payload))}})});
        
        console.log(this.soma)
        return (this.soma);
        
  }

  comidinha(){
    this.compras = this.dbService.getAll('compras');
    this.comidas = [];
    this.compras.forEach(compras => {compras.forEach(compras2 =>{if(compras2.categoria == "comida"){return(this.comidas.push(compras2))}})});
    return (this.comidas); 
    
  }
  
  remover(key){
    this.dbService.revome('compras',key).then( d => {console.log("removido")});
  }
    
  icon(categoria){
    var icon
    this.categorias.forEach(element => {if (element.title == categoria) {icon = element.icon}});
    return icon
    

  }

  visualOrdem(){
    this.visual = this.dbService.getArray('visual')
    this.visual.sort(function compare(a,b){
      if (a < b) return -1;
      if (a > b) return 1;
      return 0
      
    
    })
  }
  

}
