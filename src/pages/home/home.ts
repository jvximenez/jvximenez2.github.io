import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ConfiguraçõesPage } from '../configura\u00E7\u00F5es/configura\u00E7\u00F5es';
import { StatusBar } from '@ionic-native/status-bar';
import { getLocaleCurrencyName } from '@angular/common';
import { stringify } from '@angular/core/src/util';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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

 
  private categorias;
  private pagamentos;


  constructor(public navCtrl: NavController,
     public dbService: FirebaseServiceProvider,
     private statusBar: StatusBar) {

    this.Criacao()
    this.statusBar.backgroundColorByHexString('#ffffff');
    this.categorias = this.dbService.getArray('categoria')
    this.pagamentos = this.dbService.getArray('pagamento')
    console.log(this.pagamentos.get)
    this.compras.mes = String(this.AchaMes());
    this.compras.ano = String(this.achaAno());
    this.compras.data = this.Criacao();
    this.compras.total = String(this.Total())



    
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


   criacaoObjeto(nome){
     var teste = {}
     Object.defineProperty('compras',nome,{value: "sdadsa",writable: true,
     enumerable: true,
     configurable: true });
      this.save(teste);
   }
  

   swipe(event) {
    if(event.direction === 2) {
      this.navCtrl.parent.select(1)
    }
  }
}
