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
  public varredura = [];

  constructor(public navCtrl: NavController, public dbService: FirebaseServiceProvider) {
    this.categorias = this.dbService.getArray('categoria')
    this.compras = this.dbService.getAll('compras')
    this.visual = this.dbService.getAll('visual')


    this.varredura = this.DefinindoArrays();
    console.log((this.varredura),"varredura aquio");
    

  }

  remover(key){
    this.dbService.revome('compras',key).then( d => {console.log("removido")});
  }
    
  icon(categoria){
    var icon
    this.categorias.forEach(element => {if (element.title == categoria) {icon = element.icon}});
    return icon
  }

  goToSingle(compras) {
    this.navCtrl.push(EditPage, 
    {'compras' : compras});
  }


  somando(){
    var compras = this.dbService.getAll('compras');
    this.soma = 0;
    this.compras.forEach(compras => {compras.forEach(compras2 => {if(compras2.title == "Gremio"){return (this.soma += Number(compras2.payload))}})});
    return (this.soma);
        
  }

  DefinindoArrays2(){
  var compras = this.dbService.getAll('compras')
  console.log(compras, "esse é o primeiro, o observable, mas pode ser defino com o | async no ngFor = let a of itens| async")
  compras.forEach(itens => {console.log(itens, "esse é o array com todas as iterações"),
  itens.forEach(item => {console.log(item), "esse é o item especifico, vai ter varios"})})
  }

  DefinindoArrays(){
    var varredura = [];
    var compras = this.dbService.getAll('compras')
    console.log(compras)
    compras.forEach(itens => {
    itens.forEach(item => {if (Boolean(this.verificoSeEstaNaLista(item['ano'],item['mes'],varredura)) == false) {varredura.push(([item['ano'],item['mes']].join(' - ')))}; 
    })})
    return(varredura)
    };
    
    
    

  

    verificoSeEstaNaLista(ano,mes,lista){
      console.log(ano,mes,lista,"olhe esses valores")
      var contador = 0;
      var item = ([ano,mes].join(' - '));
      lista.forEach(element => { if(element == item) {contador =+ 1 }})
      if (contador > 0){return true}
      return false

    }
    
    

  



    
  
      
    

  

}
