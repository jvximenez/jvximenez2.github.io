import { Component } from '@angular/core';
import { NavController, Toggle } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ConfiguraçõesPage } from '../configura\u00E7\u00F5es/configura\u00E7\u00F5es';
import { StatusBar } from '@ionic-native/status-bar';
import { getLocaleCurrencyName } from '@angular/common';
import { stringify } from '@angular/core/src/util';
import { AboutPage } from '../about/about';
import { EditAtalhoPage } from '../edit-atalho/edit-atalho';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  doRefresh(refresher) {
    this.show = !this.show

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 50);
  }

  public show = false;

  compras = {
    'title': '',
    'payload': '',
    'categoria':'',
    'pagamento': '',
    'data': '',
    'ano':'',
    'mes':'',
    'total':'',

  };

  public atalhos;

 
  private categorias;
  private pagamentos;


  constructor(public navCtrl: NavController,
     public dbService: FirebaseServiceProvider,
     private statusBar: StatusBar) {

    this.Criacao()
    this.statusBar.backgroundColorByHexString('#ffffff');
    this.categorias = this.dbService.getArray('categoria')
    this.pagamentos = this.dbService.getArray('pagamento')
    this.atalhos = this.dbService.getAll('atalho')
    console.log(this.pagamentos.get)
    this.compras.mes = String(this.AchaMes());
    this.compras.ano = String(this.achaAno());
    this.compras.data = this.Criacao();
    this.compras.total = String(this.Total())
    


    
  }

  moveFocus(nextElement) {
    nextElement.setFocus();
  }

  cliczera(id){
    id.getElementById().click()
    
  }
  
  save(compras){
    console.log(compras);
    this.dbService.save('compras',compras);
  }

  save2(teste){
    console.log(teste);
    this.dbService.save('compras','Janeiro');
  }

  NavConfirg(){
    this.navCtrl.push(ConfiguraçõesPage)
  }


  Criacao(){
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    var hora = data.getHours();
    var min = data.getMinutes();
    console.log([[dia, mes, ano].join('/'),[hora,min].join(':')].join(' - '));
    return ([[dia, mes, ano].join('/'),[hora,min].join(':')].join(' - '));
  }

  Total(){
    var total;
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    var ano = data.getFullYear();
    var hora = data.getHours();
    var min = data.getMinutes();
    total = Number(ano*10000 + (mes+1)*100 + dia);
    return total
  
  }

  AchaMes(){
    var data = new Date();
    var mes = data.getMonth() +1;
    
    return(mes) 
   }

   achaAno(){
     var data = new Date();
     var ano = data.getFullYear();
    return((ano));
   }


  

   swipe(event) {
    if(event.direction == 2) {
      this.navCtrl.parent.select(1)
    }
    if(event.direction == 16) {
      console.log("false")
      this.show = false
      return this.show
    }
    if(event.direction == 16) {
      console.log("true")
      this.show = true
      return this.show
    }

    
  }

  Louco(){
    this.show = false;
    
  }

  saveAtalho(compras, atalho){
    console.log(compras);
    compras.title = atalho.title;
    compras.categoria = atalho.categoria;
    compras.payload = atalho.gasto;
    compras.pagamento = atalho.pagamento;
    this.dbService.save('compras',compras);
  }

  atalhoPush(atalho){
    this.navCtrl.push(EditAtalhoPage, {
      'atalho': atalho
    })
  }
  
}
