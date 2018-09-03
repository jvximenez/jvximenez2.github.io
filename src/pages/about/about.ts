import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { EditPage } from '../edit/edit';
import { forkJoin } from 'rxjs';

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
    this.categorias = this.dbService.getArray('categoria')
    this.compras = this.dbService.getAll('compras')
    this.visual = this.dbService.getAll('visual')
    console.log(this.visual, "visu")
    console.log(this.compras)
    

  }

  goToSingle(compras) {
    this.navCtrl.push(EditPage, 
    {'compras' : compras});
  }

  somando() {
    var compras = this.dbService.getAll('compras');
    this.soma = 0;
    this.compras.forEach(compras => {compras.forEach(compra2 => {this.soma += Number(compra2.payload), console.log(compra2.payload, this.soma)})});
        
        
        return (this.soma);
        
  }

  somando2(){
    var compras = this.dbService.getAll('compras');
    this.soma = 0;
    this.compras.forEach(compras => {compras.forEach(compras2 => {if(compras2.title == "Gremio"){return (this.soma += Number(compras2.payload))}})});
        
        
        return (this.soma);
        
  }

  comidinha(){
    var compras = this.dbService.getAll('compras');
    this.comidas = [];
    this.compras.forEach(compras => {compras.forEach(compras2 =>{if(compras2.categoria == "comida"){return(this.comidas.push(compras2))}})});
    return (this.comidas); 
    
  }
  
  remover(key){
    this.dbService.revome('compras/2018/9',key).then( d => {console.log("removido")});
  }
    
  icon(categoria){
    var icon
    this.categorias.forEach(element => {if (element.title == categoria) {icon = element.icon}});
    return icon
    

  }

  visualOrdem(){
    var newvis = [];
    var compras = [];
    this.visual = this.dbService.getAll('visual')
    this.visual = this.visual.forEach(visual1 => {visual1.forEach(visual2 => {newvis.push(visual2), compras.push(this.dbService.getAll(['compras',visual2.ano,visual2.mes].join('/')))})})
    console.log(compras,"olha as compras aqui");
    newvis.sort(function compare(a,b){
      if (a.final < b.final) return -1;
      if (a.final > b.final) return 1;
      return 0;});
      return(newvis);
  }



    
  
      
    

  

}
