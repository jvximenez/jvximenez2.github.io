import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { EditPage } from '../edit/edit';
import { forkJoin, empty } from 'rxjs';

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

  public varredura;
  public total;
  public produtos = [];

  constructor(public navCtrl: NavController, public dbService: FirebaseServiceProvider) {
    this.categorias = this.dbService.getArray('categoria')
    this.compras = this.dbService.getAll('compras')
    this.visual = this.dbService.getAll('visual')
    this.total = this.DefinindoArrays();

    console.log(this.total, "ah senhor, total aqui")
    
    this.total.forEach (item =>console.log(item[0] , "olha o testetetete"));
    this.varredura = (this.total[0])
    console.log("aqui varredura e compras", this.varredura, this.produtos)
    
  
    

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
        
  };

  DefinindoArrays2(){
  var compras = this.dbService.getAll('compras')
  console.log(compras, "esse é o primeiro, o observable, mas pode ser defino com o | async no ngFor = let a of itens| async")
  compras.forEach(itens => {console.log(itens, "esse é o array com todas as iterações"),
  itens.forEach(item => {console.log(item), "esse é o item especifico, vai ter varios"})})
  };

  DefinindoArrays(){
    var array = [];
    var varredura = [];
    var compras = this.dbService.getAll('compras');
    compras.forEach(itens => {
    itens.forEach(item => {if (Boolean(this.verificoSeEstaNaLista(item['ano'], item['mes'],varredura)) == false) {varredura.push(([item['ano'],item['mes']].join(' - ')))}
    })});
    compras.forEach(itens => {array.push(this.ListaDeListasComKey(varredura,itens))})
    array.push(varredura);
    console.log(array, "olha essa porra aqui")
    return (array)
  };
    
  

    verificoSeEstaNaLista(ano,mes,lista){
      var contador = 0;
      var item = ([ano,mes].join(' - '));
      lista.forEach(element => { if(element == item) {contador =+ 1 }});
      if (contador > 0){return true}
      return false

    }

    ListaDeListasComKey(lista,itens){
      let arrayPr = [];
      

      var cont = 0;
      var adicao;
      while (cont < lista.length) {
        arrayPr.push([]);
        cont += 1
        };
        itens.forEach(item => { adicao = (this.verificoSeigual(item['ano'],item['mes'],lista)); arrayPr = this.PUSH(arrayPr,item,adicao);});
        console.log("esse array P completo ", arrayPr);
        return (arrayPr);

    }
    
    verificoSeigual(ano,mes,lista){
      var contador = -1;
      var espera;
      var item = ([ano,mes].join(' - '));
      lista.forEach(element => {contador += 1; if (element == item) {espera = contador}})
      return (espera);

    };

    PUSH(lista,item,adicao){
      lista[adicao][(lista[adicao].length)]=  Object(item);
      return(lista);

    };


  



    
  
      
    

  

}
