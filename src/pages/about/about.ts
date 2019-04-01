import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { EditPage } from '../edit/edit';
import "rxjs/add/operator/map";
import { TodasAsComprasPage } from '../todas-as-compras/todas-as-compras';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  

  public compras;
  
  public comidas;
  public soma;
  public categorias;
  

  public visual;

  public varredura;
  public total;
  public produtos = [];

  comprass = {
    'title': '',
    'payload': '',
    'categoria':'Comida',
    'pagamento': 'Nubank',
    'data': '',
    'ano':'',
    'mes':'',
    'total':'',

  };

  

  constructor(public navCtrl: NavController, public dbService: FirebaseServiceProvider, public alertCtrl: AlertController) {
    this.categorias = this.dbService.getArray('categoria')
    this.compras = (this.dbService.getAllQuantidade('compras',50)).map(a => a.reverse());
    this.visual = this.dbService.getAll('visual')
    this.varredura = (this.DefinindoArrays());
  
  
    

  }

  goToTudo(){
    this.navCtrl.push(TodasAsComprasPage)
    
  }

  swipe(event) {
    if(event.direction === 2) {
      this.navCtrl.parent.select(2);
    }
    if(event.direction === 4) {
      this.navCtrl.parent.select(0);
    }
  }

  remover(key){
    console.log("remover")
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


  somando(){
    var compras = this.dbService.getAll('compras');
    var soma = 0;
    compras.forEach(compras => {compras.forEach(compras2 => {if(compras2['title'] == "Gremio"){return (this.soma += Number(compras2['payload']))}})});
    return (this.soma);
        
  };


  DefinindoArrays(){
    var array = [];
    var varredura = [];
    var compras = this.dbService.getAll('compras').map(a=> a.reverse());
    compras.forEach(itens => {
    itens.forEach(item => {if (Boolean(this.verificoSeEstaNaLista(item['ano'], item['mes'],varredura)) == false) {varredura.push(([item['ano'],item['mes']].join(' - ')))}
    })});
    compras.forEach(itens => {array.push(this.ListaDeListasComKey(varredura,itens))})
    array.push(varredura);

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

  dia(dia){
    var retornavel;
    var fileds = dia.split('/')
    retornavel = fileds[0];
    return (retornavel);

  };

  cor(categoria){
    if (categoria == "Ignorar"){
      return("danger")
    }
    else{return("black")}
  }

  copiar(item){
    this.comprass=item;
    delete this.comprass['key']
    this.dbService.save('compras',this.comprass);


  }

  copiarDiv(item){
    this.comprass = item;
    delete this.comprass['key']
    this.comprass.pagamento = 'Ignorar'
    this.comprass.payload = String((-1)*Number(this.comprass.payload))
    const prompt = this.alertCtrl.create({
      title: 'Categoria',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],  
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Comida',
          handler: data => {
            this.comprass.categoria = "Comida"; 
            this.dbService.save('compras',this.comprass)
            console.log('Saved clicked');
          }
        },
        {
          text: 'Viagem',
          handler: data => {
            this.comprass.categoria = "Viagem"; 
            this.dbService.save('compras',this.comprass)
            console.log('Saved clicked');
          }
        },
        {
          text: 'Date',
          handler: data => {
            this.comprass.categoria = "Date"; 
            this.dbService.save('compras',this.comprass)
            console.log('Saved clicked');
          }
        },
        
        {
          text: 'Save',
          handler: data => {
            this.comprass.categoria = data.title; 
            this.dbService.save('compras',this.comprass)
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }




  



    
  
      
    

  

}
