import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import chartJs from 'chart.js';
import { AnaliseCategoriaPage } from '../analise-categoria/analise-categoria';
import { AnalisePagamentoPage } from '../analise-pagamento/analise-pagamento';
import { PrevisãoPage } from '../previs\u00E3o/previs\u00E3o';


/**
 * Generated class for the AnalisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-analise',
  templateUrl: 'analise.html',
})
export class AnalisePage {
  @ViewChild('barCanvas') barCanvas;
  barChart: any;


  teste = {
    'categoria 1' : [4.5],
    'categoria 2' : [4.5],
    'categoria 3' : [4.5],
    'categoria 4' : [4.5],
    'mes':"9",
    'ano':'2018',
  }

  public categorias;
  public compras;
  public visual;
  public varredura: String[];
  public testemassa;
  public pagamentos;

  public ComprasArray = [];

  ///////////chars public //////////////
  public categoriasChart
  public valoresChart
  ///////////////////////////////////////

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService: FirebaseServiceProvider) {
    this.categorias = this.dbService.getAll('categoria')
    this.pagamentos = this.dbService.getArray('pagamento')
    this.compras = this.dbService.getAll('compras')
    this.visual = this.dbService.getAll('visual')
    this.varredura = this.DefinindoArrays();
    this.ComprasArray = this.arrayCompras(this.compras);

    this.testemassa = this.varredura[0]

    
 
    
    

    //chart//
    this.categoriasChart = (this.getChartCat(this.categorias));

  }

  ////////////////////////////////////////////////CHARTS/////////////////////////////////////
  public chartLabels:String[] = Array(this.categoriasChart);
  public chartData:number[] = [100,10,1,0,10,1,0,1,0,1,0];
  public chartType:String = 'bar';


  getChartCat(categorias){
    let arrayC = [];
    categorias.forEach(element => { element.forEach( item => {arrayC.push(item['title'])})});
    
    return (arrayC)
  }
 
  ngAfterViewInit(){
    setTimeout(()=> {
      this.barChart = this.getBarChart();
    },500)
    setTimeout(()=> {
      this.valoresChart = this.getGastoChart(this.varredura[0], this.categorias, this.compras)
    },300)

  }

  getChart(context, charType, data, options){
    return new chartJs(context, {
      data,
      options,
      type: charType
    })
  }

  getBarChart(){
    const data = {
      labels: this.categoriasChart,
      datasets: [{
        label: 'Planejado',
        data: [0,0,0,0,0,0,0],
        backgroundColor:  '#2f6acf',
        borderWidth: 2
    },{
      label: 'Gasto',
      data: this.valoresChart,
      backgroundColor: '#32b9db',
      borderWidth: 2
    }],
  
  };

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          autoSkip: false,
        }
      }],
      xAxes: [{
        ticks: {
          autoSkip: false,
        }

      }]
    }
  }

  return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
}


  getGastoChart(data, categorias, compras){
    console.log("entrou", categorias, compras);
    let linha = []
    categorias.forEach(itens => {itens.forEach(item => {linha.push(this.somaCat2(item.title,data))})})
    console.log(linha, "testeeee")
    return (linha)
  }

  ///////////////////////////////////////////////////////////////////////////////////////////


  arrayCompras(compras){
    let array = []
    let linha = []
    compras.forEach( itens => itens.forEach(item => {linha = [], linha.push(item.payload,[item.ano,item.mes].join(' - '),item.categoria,item.pagamento), array.push(linha)}))
    
    return (array)
 
  }
  
  DefinindoArrays(){
    var array: String[] = [];
    var varredura = [];
    var compras = this.dbService.getAll('compras');
    compras.forEach(itens => {
    itens.forEach(item => {if (Boolean(this.verificoSeEstaNaLista(item['ano'], item['mes'],varredura)) == false) {varredura.push(([item['ano'],item['mes']].join(' - ')))}
    })});
    compras.forEach(itens => {array.push(String(this.ListaDeListasComKey(varredura,itens)))})
    array.push(String(varredura));
    console.log(array)
    return ((varredura))
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
    console.log(arrayPr);
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

somaCat(categoria,data){
  var valorCat = 0 
  this.ComprasArray.forEach(item => {if (String(item[2]) == String(categoria) && 
    String(item[1]) == String(data)) { valorCat = valorCat + Number(item[0])}}
  );

  return(Math.round(valorCat))
}


somaCat2(categoria,data){
  console.log(categoria,data)
  let valorCat = 0 
  this.ComprasArray.forEach(item => {if (String(item[2]) == String(categoria) && 
    String(item[1]) == String(data)) { valorCat = valorCat + Number(item[0]), console.log(item[0],data, "5555555555")}}
  );
  console.log(valorCat,"aaaa")
  return(Math.round(valorCat))
}

somaPagamento(pagamento,data){
  var valorPag = 0 
  this.ComprasArray.forEach(item => {if (String(item[3]) == String(pagamento) && 
    String(item[1]) == String(data)) { valorPag = valorPag + Number(item[0])}}
  );

  return(Math.round(valorPag))
}



somaTotal(data){
  var valorTotal = 0
  this.ComprasArray.forEach(item => {if (String(item[2]) != "Pais" && String(item[1]) == String(data)) { valorTotal = valorTotal + Number(item[0])}}
  );

  return(Math.round(valorTotal))
}

swipe(event) {
  if(event.direction === 4) {
    this.navCtrl.parent.select(1);
  }
}

  atualiza(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  goToAnalise(data,categoria){
  this.navCtrl.push(AnaliseCategoriaPage, 
    {'data' : data,
    'categoria': categoria,
     'compra': this.compras });
  }

  goToAnalisePag(data,pagamento){
    this.navCtrl.push(AnalisePagamentoPage, 
      {'data' : data,
      'pagamento': pagamento,
       'compra': this.compras });
    }

  previsao(){
    this.navCtrl.push(PrevisãoPage)
  }



}
