import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import chartJs from 'chart.js';


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
  public varredura;
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
 
    
    

    //chart//
    this.categoriasChart = (this.getChartCat(this.categorias));
    this.valoresChart = this.getGastoChart("2018 - 9", this.categoriasChart, this.ComprasArray)

    console.log(this.categorias,(this.categoriasChart),this.ComprasArray, "ae")

  }

  ////////////////////////////////////////////////CHARTS/////////////////////////////////////
  public chartLabels:String[] = Array(this.categoriasChart);
  public chartData:number[] = [100,10,1,0,10,1,0,1,0,1,0];
  public chartType:String = 'bar';


  getChartCat(categorias){
    let arrayC = [];
    categorias.forEach(element => { element.forEach( item => {arrayC.push(item['title'])})});
      
    console.log(arrayC,"XCCC")
    return (arrayC)
  }
 
  ngAfterViewInit(){
    setTimeout(()=> {
      this.barChart = this.getBarChart();
    },150)

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
        data: [45,13],
        backgroundColor:  'rgb(20,0,255)',
        borderWidth: 1
    },{
      label: 'Gasto',
      data: [56,44],
      backgroundColor: 'rgb(255,0,0)',
      borderWidth: 1
    }],
  
  };

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
}


  getGastoChart(data, categoriasChart, ComprasArray){
    console.log("entrou", categoriasChart, ComprasArray)
    let arrayGastos = []
    let valorCat = 0
    let cont = -1
    ComprasArray.forEach(item => console.log(item,"iteem")) //{ cont += 1; console.log(item, "item"); if (String(item[2]) == String(categoriasChart[cont]) && 
     // String(item[1]) == String(data)) { valorCat = valorCat + Number(item[0])}
  //  arrayGastos.push(valorCat)})
   // console.log(arrayGastos, " olha eles aqui")
  
   // return(arrayGastos)

  }

  ///////////////////////////////////////////////////////////////////////////////////////////


  ionViewDidLoad() {
    console.log('ionViewDidLoad AnalisePage');
  }


  arrayCompras(compras){
    let array = []
    let linha = []
    compras.forEach( itens => itens.forEach(item => {linha = [], linha.push(item.payload,[item.ano,item.mes].join(' - '),item.categoria,item.pagamento), array.push(linha)}))
    
    return (array)
 
  }
  
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
    return (varredura)
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

somaCat(categoria,data){
  var valorCat = 0 
  this.ComprasArray.forEach(item => {if (String(item[2]) == String(categoria) && 
    String(item[1]) == String(data)) { valorCat = valorCat + Number(item[0])}}
  );

  return(valorCat)
}

somaPagamento(pagamento,data){
  var valorPag = 0 
  this.ComprasArray.forEach(item => {if (String(item[3]) == String(pagamento) && 
    String(item[1]) == String(data)) { valorPag = valorPag + Number(item[0])}}
  );

  return(valorPag)
}



somaTotal(data){
  var valorTotal = 0
  this.ComprasArray.forEach(item => {if (String(item[2]) != "Pais" && String(item[1]) == String(data)) { valorTotal = valorTotal + Number(item[0])}}
  );

  return(valorTotal)
}

swipe(event) {
  if(event.direction === 4) {
    this.navCtrl.parent.select(1);
  }
}





}
