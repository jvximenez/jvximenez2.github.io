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
    console.log(this.ArrayTotal,"5555555555555555555555555555555555555555555555555555555555555555555555555555555")


    
  }

  ngAfterViewInit(){
    setTimeout(()=> {
      this.teste(this.ArrayTotal)
    },7000)}

  teste(array){
    console.log(array,"qwertassssssddddddddddddddddddddddddddddddddddddddddddddddd")
    
    var a1 = (String(array[0]/array[3])+'%')
    var a2 = (String((array[0]+array[1])/array[3])+'%')
    var a3 = (String((array[2]/array[3]))+'%')
    var a4 = (String(array[3])+'%')
    console.log(a1,a2,a3,a4)

    document.getElementById("Grafcat").style.width = a1
    document.getElementById("GrafCatPrev").style.width = a2
    document.getElementById("GrafTotal").style.width = a3
    document.getElementById("GrafTotalPrev").style.width = a4
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

  retornaArray(prevv){
    console.log(prevv)
    let cat = this.getCategorias(prevv)
    let a = 0 ;
    cat.forEach (element => a += (Number(prevv[element])))
    console.log(a, " valor de A")
    return a


  }

  getCategorias(previsao){
    let a = Object.keys(previsao)
    console.log(previsao,"aqui", a)
    let array = []
    a.forEach(element => { if(element != 'key' && element != 'total' && element != 'mes' && element != 'ano') {array.push(element)} 
    });
    return (array)
    
  }

  



  CriaArrayGrafico(Categoria){
    var ArrayT = [0,0,0,0]
    this.Compras.forEach(itens => itens.forEach (item => {if(item.categoria == Categoria && item.ano == this.ano && Number(item.mes) == Number(this.mes)){ArrayT[0] += Number(item.payload), console.log(item, ArrayT,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")}}))
    this.previsto.forEach(itens => itens.forEach (item => {if(item.ano == this.ano && item.mes == this.mes){ArrayT[1] += Number(item[Categoria])}}))
    this.Compras.forEach(itens => itens.forEach (item => {if(item.ano == this.ano && item.mes == this.mes){ArrayT[2] += Number(item.payload)}}))
    this.previsto.forEach(itens => itens.forEach (item => {if(item.ano == this.ano && item.mes == this.mes){ArrayT[3] += Number(this.retornaArray(item))}}))
    return (ArrayT)

  }

  



  
}
