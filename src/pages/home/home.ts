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
  public showGraf = false;


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
  public previsto;

  public mes;
  public ano;
  public Compras;
  public ComprasArray;
  public ArrayTotal;

  public array1 = [1,2,3,4,5]
  public array2 = [5,6,7,1,2]

  constructor(public navCtrl: NavController,
     public dbService: FirebaseServiceProvider,
     private statusBar: StatusBar) {

    this.Criacao(0)
    this.statusBar.backgroundColorByHexString('#ffffff');
    this.categorias = this.dbService.getArray('categoria')
    this.pagamentos = this.dbService.getArray('pagamento')
    this.atalhos = this.dbService.getAll('atalho')

    this.compras.mes = String(this.AchaMes());
    this.compras.ano = String(this.achaAno());
    this.compras.data = this.Criacao(0);
    this.compras.total = String(this.Total(0))

    this.mes = this.AchaMes();
    this.ano = this.achaAno();

    this.previsto = this.dbService.getAll('previsao')
    this.Compras = (this.dbService.getAllQuantidade('compras',50)).map(a => a.reverse());
    this.ArrayTotal =  this.CriaArrayGrafico('Mercado')
    console.log(this.ArrayTotal, this.Compras)
    


    
  }

  moveFocus(nextElement) {
    nextElement.setFocus();
  }

 
  
  save(compras){
    this.Criacao(0)
    this.dbService.save('compras',compras);
  }

  ontem(compras){
    this.Criacao(1)
    this.compras.data = this.Criacao(1);
    this.compras.total = String(this.Total(1))
    this.dbService.save('compras',compras);
  }

  save2(teste){
    console.log(teste);
    this.dbService.save('compras','Janeiro');
  }

  NavConfirg(){
    this.navCtrl.push(ConfiguraçõesPage)
  }


  Criacao(A){
    var data = new Date();
    var dia = data.getDate()-A;
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    var hora = data.getHours();
    var min = data.getMinutes();
    console.log([[dia, mes, ano].join('/'),[hora,min].join(':')].join(' - '));
    return ([[dia, mes, ano].join('/'),[hora,min].join(':')].join(' - '));
  }

  Total(A){
    var total;
    var data = new Date();
    var dia = data.getDate()-A;
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

  Favorito(){
    this.compras.pagamento = "N26"
  }

  arrayCompras(compras){
    let array = []
    let linha = []
    compras.forEach( itens => itens.forEach(item => {linha = [], linha.push(item.payload,[item.ano,item.mes].join(' - '),item.categoria,item.pagamento,item.total), array.push(linha)}))
    
    return (array)
 
  }



  CriaArrayGrafico(Categoria){
    var ArrayT = [0,0,0,0]
    this.Compras.forEach(itens => itens.forEach (item => {if(item.categoia == Categoria && item.ano == this.ano && item.mes == this.mes){ArrayT[1] += Number(item.payload), console.log(item, ArrayT)}}))
    this.previsto.forEach(itens => itens.forEach (item => {if(item.ano == this.ano && item.mes == this.mes){ArrayT[1] += Number(item[Categoria])}}))
    this.Compras.forEach(itens => itens.forEach (item => {if(item.ano == this.ano && item.mes == this.mes){ArrayT[2] += Number(item.payload), console.log(ArrayT)}}))
    this.previsto.forEach(itens => itens.forEach (item => {if(item.ano == this.ano && item.mes == this.mes){this.SomaCat(item)}}))
    return (ArrayT)

  }

  SomaCat(item){
  }

  



  
}
