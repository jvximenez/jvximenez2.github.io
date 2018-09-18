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


  

 categorias;
 previsto;
 pagamentos;
 compras;
 ComprasArray;

  

  ///////////chars public //////////////
  public categoriasChart;
  public valoresChart;
  public valoresPrevistos;
  ///////////////////////////////////////

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService: FirebaseServiceProvider) {
    this.categorias = this.dbService.getAll('categoria')
    this.previsto = this.dbService.getAll('previsao')
    this.pagamentos = this.dbService.getArray('pagamento')
    this.compras = this.dbService.getAll('compras')
    this.ComprasArray = this.arrayCompras(this.compras);


 
    
    

    //chart//
    this.categoriasChart = (this.getChartCat(this.categorias));

  }

  ////////////////////////////////////////////////CHARTS/////////////////////////////////////


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
      this.valoresChart = this.getGastoChart('2018 - 9', this.categorias, this.compras)
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



  ///////////////////////////////<< PREVISAO >>////////////////////////////////////


  retornaKeys(prev){
    let array;
    array = Object.keys(prev);
    console.log(array, " array loco")
    return array
  }
 
  


}
