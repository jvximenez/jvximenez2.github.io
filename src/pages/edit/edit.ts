import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  compras = {
    'title': '',
    'payload': '',
    'categoria':'',
    'pagamento': '',
    'data': '',

  };
  
  public DataO;

  public categorias;
  public pagamentos;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseServiceProvider) {
    this.compras = this.navParams.get('compras');
    this.categorias = this.firebaseService.getArray('categoria')
    this.pagamentos = this.firebaseService.getArray('pagamento')
    console.log(this.compras)

    this.DataO = new Date().toISOString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  update(compras){
    this.MudandoData(this.DataO)
    this.firebaseService.update('compras',compras).then( d => {
      this.navCtrl.pop()});
  }

  remove(compras){
    this.firebaseService.revome('compras',compras).then( d => {
      this.navCtrl.pop()});
  }

  Mostra(){
    console.log(this.DataO)
    this.MudandoData(this.DataO)
  }

  MudandoData(valor){
    var fields = valor.split('-')
    var dia = fields[2].split('T')
    console.log(fields,dia)
    this.compras['ano'] =  fields[0]
    this.compras['mes'] =  String(Number(fields[1]))
    this.compras['total'] =  String(Number(Number(this.compras['ano'])*10000 + Number(this.compras['mes'])*100 + Number(dia[0])));
    console.log(this.compras['total'])
    var data = new Date();
    var hora = data.getHours();
    var min = data.getMinutes();
    this.compras.data = ([[Number(dia[0]), Number(this.compras['mes']), Number(this.compras['ano'])].join('/'),[hora,min].join(':')].join(' - '));
  }
}
