import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ConfiguraçõesPage } from '../configura\u00E7\u00F5es/configura\u00E7\u00F5es';
import { StatusBar } from '@ionic-native/status-bar';
import { getLocaleCurrencyName } from '@angular/common';

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

  };

 
  private categorias;
  private pagamentos;
  private dataM;
  

  



  constructor(public navCtrl: NavController,
     public dbService: FirebaseServiceProvider,
     private statusBar: StatusBar) {

    this.Criacao()
    this.statusBar.backgroundColorByHexString('#ffffff');
    this.categorias = this.dbService.getArray('categoria')
    this.pagamentos = this.dbService.getArray('pagamento')
    this.dataM = this.AchaMes();
    this.compras.data = this.Criacao();



    
  }


  
  save(compras){
    console.log(compras);
    this.dbService.save((['compras',this.dataM].join('/')),compras);
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

  AchaMes(){
    var data = new Date();
    var mes = data.getMonth() +1;
    var ano = data.getFullYear();
    return([ano,mes].join('/'))

    

  }
}
