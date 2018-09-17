import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditPage } from '../edit/edit';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';


/**
 * Generated class for the AnalisePagamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-analise-pagamento',
  templateUrl: 'analise-pagamento.html',
})
export class AnalisePagamentoPage {

  dataEnviada;
  pagamentoEnviado;
  public compras;
  categorias;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService: FirebaseServiceProvider) {
    this.compras = this.navParams.get('compra')
    this.dataEnviada = this.navParams.get('data')
    this.pagamentoEnviado = this.navParams.get('pagamento')
    this.categorias = this.dbService.getArray('categoria')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnaliseCategoriaPage');
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

  dia(dia){
    var retornavel;
    var fileds = dia.split('/')
    retornavel = fileds[0];
    return (retornavel);

  }

}