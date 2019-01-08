import { Component, TestabilityRegistry } from '@angular/core';
import { NavController, Toggle } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ConfiguraçõesPage } from '../configura\u00E7\u00F5es/configura\u00E7\u00F5es';
import { StatusBar } from '@ionic-native/status-bar';
import { EditAtalhoPage } from '../edit-atalho/edit-atalho';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  doRefresh(refresher) {
    this.show = !this.show

    setTimeout(() => {
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

  public DataO;


  Arredonda(item){
    return Math.round(item)
    
  }

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

  a1 = 0
  a2 = 0
  a3 = 0
  a4 = 0

  constructor(public navCtrl: NavController,
     public dbService: FirebaseServiceProvider,
     private statusBar: StatusBar) {

    this.DataO = new Date().toISOString();

    this.Criacao(0)
    this.statusBar.backgroundColorByHexString('#ffffff');
    this.categorias = this.dbService.getArray('categoria')
    this.pagamentos = this.dbService.getArray('pagamento')
    this.atalhos = this.dbService.getAll('atalho')

    this.compras.mes = String(this.AchaMes());
    this.compras.ano = String(this.achaAno());
    this.compras.data = this.Criacao(0);
    

    this.mes = this.AchaMes();
    this.ano = this.achaAno();

    this.previsto = []
    this.Compras = []
    this.ArrayTotal =  [0,0,0,0]

   



    
  }
    

  teste(array){
    
    var a1 = (String(array[0]*100/array[3])+'%')
    var a2 = (String((array[1]*100)/array[3])+'%')
    var a3 = (String((array[2]*100/array[3]))+'%')
    var a4 = (String("100%"))
  
    document.getElementById("teste4").style.width = a1
    document.getElementById("teste3").style.width = a2
    document.getElementById("teste2").style.width = a3
    document.getElementById("teste1").style.width = a4
  }

  moveFocus(nextElement) {
    nextElement.setFocus();
  }

  Fav(){
    if (this.compras.pagamento == "N26"){
      this.compras.pagamento = "Dinheiro"
      return
    }
    this.compras.pagamento = "N26"
  }

  Fav2(){
    if (this.compras.categoria == "Mercado"){
      this.compras.categoria = "Comida"
      return
    }
    this.compras.categoria = "Mercado"
  }

  save(compras){
    this.MudandoData(this.DataO)
    this.dbService.save('compras',compras);
    this.previsto = this.dbService.getAll('previsao')
    this.Compras = (this.dbService.getAllQuantidade('compras',50)).map(a => a.reverse());
    this.ArrayTotal =  this.CriaArrayGrafico(compras.categoria)
    this.showGraf = true;
    setTimeout(()=> {
      this.teste(this.ArrayTotal)
    },1000)
  }

  ontem(compras){
      var date = new Date
      date.setDate(date.getDate() - 4)
      console.log(date)
      this.DataO = date.toISOString()
      this.save(this.compras)
    }
    

  save2(teste){
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

    return ([[dia, mes, ano].join('/'),[hora,min].join(':')].join(' - '));
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
      this.show = false
      return this.show
    }
    if(event.direction == 16) {
      this.show = true
      return this.show
    }

    
  }

  Louco(){
    this.show = false;
    
  }

  saveAtalho(compras, atalho){
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

  retornaArray(prevv){
    let cat = this.getCategorias(prevv)
    let a = 0 ;
    cat.forEach (element => a += (Number(prevv[element])))
    return a


  }

  getCategorias(previsao){
    let a = Object.keys(previsao)
    let array = []
    a.forEach(element => { if(element != 'key' && element != 'total' && element != 'mes' && element != 'ano') {array.push(element)} 
    });
    return (array)
    
  }

  



  CriaArrayGrafico(Categoria){
    var ArrayT = [0,0,0,0]
    this.Compras.forEach(itens => itens.forEach (item => {if(item.categoria == Categoria && item.ano == this.ano && Number(item.mes) == Number(this.mes)){ArrayT[0] += Number(item.payload)}}))
    this.previsto.forEach(itens => itens.forEach (item => {if(item.ano == this.ano && item.mes == this.mes){ArrayT[1] += Number(item[Categoria])}}))
    this.Compras.forEach(itens => itens.forEach (item => {if(item.ano == this.ano && item.mes == this.mes){ArrayT[2] += Number(item.payload)}}))
    this.previsto.forEach(itens => itens.forEach (item => {if(item.ano == this.ano && item.mes == this.mes){ArrayT[3] += Number(this.retornaArray(item))}}))
    return (ArrayT)

  }

  Hoje(){
    var data1 = new Date
    var data = [data1.getFullYear(),Number(data1.getMonth() + 1), data1.getDay()].join('-')
    return data

  }

  Mostra(){
    console.log(this.DataO)
    this.MudandoData(this.DataO)
  }

  MudandoData(valor){
    var fields = valor.split('-')
    var dia = fields[2].split('T')
    console.log(fields,dia)
    this.compras.ano =  fields[0]
    this.compras.mes =  String(Number(fields[1]))
    this.compras.total =  String(Number(Number(this.compras.ano)*10000 + Number(this.compras.mes)*100 + Number(dia[0])));
    console.log(this.compras.total)
    var data = new Date();
    var hora = data.getHours();
    var min = data.getMinutes();
    this.compras.data = ([[Number(dia[0]), Number(this.compras.mes), Number(this.compras.ano)].join('/'),[hora,min].join(':')].join(' - '));
  }
  

  



  
}
