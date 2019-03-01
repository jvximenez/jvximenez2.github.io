import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import chartJs from 'chart.js';
import { AnaliseCategoriaPage } from '../analise-categoria/analise-categoria';
import { AnalisePagamentoPage } from '../analise-pagamento/analise-pagamento';
import { PrevisãoPage } from '../previs\u00E3o/previs\u00E3o';
import { GraficosPage } from '../graficos/graficos';


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


  

 categorias;
 previsto;
 pagamentos;
 compras;
 ComprasArray;

  

  ///////////chars public //////////////
  public categoriasChart;
  public valoresChart;
  public valoresPrevistos;
  public ShowTarefas;

  public ArrayDividas;
  ///////////////////////////////////////

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService: FirebaseServiceProvider) {
    this.categorias = this.dbService.getAll('categoria')
    this.previsto = this.dbService.getAll2('previsao').map(a => a.reverse())
    this.pagamentos = this.dbService.getArray('pagamento')
    this.compras = this.dbService.getAll('compras')
    this.ComprasArray = this.arrayCompras(this.compras);

    this.ShowTarefas = this.dbService.getAll('configuracoes/shows2')


    //chart//
    this.categoriasChart = (this.getChartCat(this.categorias));
    this.ArrayDividas = this.SeriesA()

   

  }

  ////////////////////////////////////////////////CHARTS/////////////////////////////////////


  
  grafico(previsao,data,compras,comprasArray){
    this.navCtrl.push(GraficosPage, 
      {'previsao' : previsao,
      'data':data,
      'compras':compras,
      'comprasArray': comprasArray});
    }
  

  getChartCat(categorias){
    let arrayC = [];
    categorias.forEach(element => { element.forEach( item => {arrayC.push(item['title'])})});
    
    return (arrayC)
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

  return 0;
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
    compras.forEach( itens => itens.forEach(item => {linha = [], linha.push(item.payload,[item.ano,item.mes].join(' - '),item.categoria,item.pagamento,item.total), array.push(linha)}))
    
    return (array)
 
  }


  somaCat(categoria,data){
    console.log(categoria,"cattssssaaaass")
    var valorCat = 0 
    this.ComprasArray.forEach(item => {if (String(item[2]).includes(String(categoria)) && 
      String(item[1]) == String(data)) { valorCat = valorCat + Number(item[0])}}
    );

    return(Math.round(valorCat))
}

  somaCatDiv(categoria){
    console.log(categoria,"cattss")
    var valorCat = 0 
    this.ComprasArray.forEach(item => {if (String(item[2]) == String(categoria)) { valorCat = valorCat + Number(item[0])}}
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
      String(item[1]) == String(data) && (String(item[2]) != ("Ignorar")))  { valorPag = valorPag + Number(item[0])}}
    );

    return(Math.round(valorPag))
  }

  somaSemana(semana,data){
    var SemanPag = 0
    if (semana == 1){
      var a = 1
      var b = 7
    }
    if (semana == 2){
      var a = 8
      var b = 14
    }
    if (semana == 3){
      var a = 15
      var b = 21
    }
    if (semana == 4){
      var a = 22
      var b = 31
    }

    this.ComprasArray.forEach(item => {if ((Number(item[4].substr(-2, 2))) >= a && (Number(item[4].substr(-2, 2)))  <= b && String(item[1]) == String(data)) { SemanPag = SemanPag + Number(item[0])}}
    );

    return(Math.round(SemanPag))
  }


  somaTotal(data){
    var valorTotal = 0
    this.ComprasArray.forEach(item => {if (String(item[2]) != ("Pais") && (String(item[2]) != ("Ignorar") && String(item[1])) == String(data)) { valorTotal = valorTotal + Number(item[0])}}
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

  previsao(compras){
    this.navCtrl.push(PrevisãoPage,
      {'ComprasArray': compras})
  }



  ///////////////////////////////<< PREVISAO >>////////////////////////////////////


  retornaKeys(prev){
    let array;
    array = Object.keys(prev);

    return array
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

  CorIfTrue(dado){
    if (dado ==  true){
      return "primary"
    }
    if (dado !=  true){
      return ""
    }
  }

  ChangeCheckTarefas(tarefa){
    tarefa.check = !tarefa.check
    this.dbService.update('configuracoes/shows2',tarefa)
  }


  SeriesA(){
    var array = []
    var B = false
    this.compras.forEach(element => {element.forEach( elem => {if(elem.categoria.includes("Divida")){B = false; array.forEach(A => {if (A == elem.categoria) { B = true}}); if (B == false) {array.push(elem.categoria)}}})
    
  })
  console.log(array,"OIEEE")
  return (array)
  
  }



 
  


}
