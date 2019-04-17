import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import chartJs from 'chart.js';

/**
 * Generated class for the GraficosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graficos',
  templateUrl: 'graficos.html',
})
export class GraficosPage {
  @ViewChild('barCanvas') barCanvas;
  barChart: any;
  @ViewChild('pieCanvas') pieCanvas;
  pieChart: any;
  


  public compras;
  public data;
  public previsao;
  public comprasArray;

  public categorias;

  public valoresPrevistos;

  public valoresGastos;

  
  public gradiente = [];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.compras = this.navParams.get('compras')
    this.data = this.navParams.get('data')
    this.previsao = this.navParams.get('previsao')
    this.comprasArray =  this.navParams.get('comprasArray')

    this.categorias = Object.keys(this.previsao)
    this.categorias = this.getCategorias(this.categorias)

    this.valoresPrevistos = this.getValoresPrevistos( this.categorias, this.previsao )

    this.gradiente = this.Color(11);
    console.log("HAHAAHAHAH")
    

    


  }

  gradienteX(val){
    let b = 47
    var c = 106
    let branc1 =255
    let incremento1 = (b - branc1)/val.lenght
    let incremento2 = (b - branc1)/val.lenght
    let a = 0
    while (a < (val.lenght)){
      b += incremento1
      c += incremento2

      
    }
  }


  ngAfterViewInit(){
    setTimeout(()=> {
      this.barChart = this.getBarChart();
      this.pieChart = this.getPieChart();
    },100)

    setTimeout(()=> {
      this.valoresGastos = this.getGastoChart(this.data, this.categorias, this.compras)
    },50)
}

  getCategorias(previsao){
    let array = []
    previsao.forEach(element => { if(element != 'key' && element != 'total' && element != 'mes' && element != 'ano') {array.push(element)} 
    });
    return (array)
    
  }

  getValoresPrevistos(cat,prev){
    let array =[];
    cat.forEach (element => array.push(prev[element]))
    console.log(array)
    return array
  }


  getGastoChart(data, categorias, compras){
    console.log("entrou", categorias, compras);
    let linha = []
    categorias.forEach(item => {linha.push(this.somaCat2(item,data))})
    console.log(linha, "testeeee")
    return (linha)
  }

  somaCat2(categoria,data){
    console.log(categoria,data)
    let valorCat = 0 
    this.comprasArray.forEach(item => {if (String(item[2]) == String(categoria) && 
      String(item[1]) == String(data)) { valorCat = valorCat + Number(item[0]), console.log(item[0],data, "5555555555")}}
    );
    console.log(valorCat,"aaaa")
    return((valorCat))
  }


  getBarChart(){
    const data = {
      labels: this.categorias,
      datasets: [{
        label: 'Planejado',
        data: this.valoresPrevistos,
        backgroundColor:  '#2f6acf',
        borderWidth: 2
    },{
      label: 'Gasto',
      data: this.valoresGastos,
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

  getChart(context, charType, data, options){
    return new chartJs(context, {
      data,
      options,
      type: charType
    })
  }

  getPieChart(){
    const data = {
      labels: this.categorias,
      datasets: [{
        label: 'Planejado',
        data: this.valoresPrevistos,
        backgroundColor:  this.gradiente,
        borderWidth: 2
    },{
      label: 'Gasto',
      data: this.valoresGastos,
      backgroundColor: this.gradiente,
      borderWidth: 2
    }],
  
  };

  const options = {
  }
  

  return this.getChart(this.pieCanvas.nativeElement, 'pie', data, options);
    
  }

  Color(a){
    console.log("entrouuuuuuuuu", a)
    let array= []
    let sempre = Math.round(255/(a-1))
    let c = 0
    let b = 0
    while (b < a) {
      b +=1
      array.push(('rgba(' + String(c)+','+ String(c)+ ','+'230)'))
      c += sempre;
    } 
    console.log(array,"cores")
    return array
  }



}
