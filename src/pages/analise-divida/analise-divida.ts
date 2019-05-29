import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { EditPage } from '../edit/edit';
import "rxjs/add/operator/map";
import { TodasAsComprasPage } from '../todas-as-compras/todas-as-compras';
import firebase from 'firebase';
/**
 * Generated class for the AnaliseDividaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-analise-divida',
  templateUrl: 'analise-divida.html',
})
export class AnaliseDividaPage {

  public compras; comprasA ; comprasRef
  
  public comidas;
  public soma;
  public categorias;
  

  public visual;

  public varredura;
  public total;
  public produtos = [];

  public countryList:Array<any>;
  public loadedCountryList:Array<any>;
  public countryRef;DividaCategoria;
  public somadiv;

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

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService: FirebaseServiceProvider, public alertCtrl: AlertController) {
    this.categorias = this.dbService.getArray('categoria')
    this.DividaCategoria = this.navParams.get('divida');
    this.visual = this.dbService.getAll('visual')
    this.varredura = (this.DefinindoArrays());
    this.countryRef = firebase.database().ref('/compras').orderByChild("total")

    this.compras = this.dbService.getAllQuantidadeO('compras','total',100).map(a => a.reverse())
    this.criaArray()

    this.somadiv = Number(0)
    
    this.countryRef.on('value', countryList => {
      
      let countries = [];
      countryList.forEach( country => {
        
          var obj
          obj = country.val()
          if (obj.categoria == this.DividaCategoria){
          obj.key = country.key
          this.somadiv += Number(obj.payload)
          obj.soma = this.somadiv
          countries.push(obj);}
        
          return false;
      });
      countries = countries.reverse()

      this.countryList = countries;
      this.loadedCountryList = countries;
    });

  
    

  }

  criaArray(){
    var array = []
    this.compras.forEach(itens => {itens.forEach(item => {array.push(item)})})
    this.comprasA = array
    this.comprasRef = array
    return array
  }

  todos(){
    this.countryRef = firebase.database().ref('/compras').limitToLast(1000).orderByChild('total')
      
    this.countryRef.on('value', countryList => {
      let countries = [];
      countryList.forEach( country => {
        countries.push(country.val());
        countries.reverse()
        return false;
      });
    
      this.countryList = countries;
      this.loadedCountryList = countries;
    });
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
  
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
  
    this.countryList = this.countryList.filter((v) => {
      if(v.title && q || v.categoria ) {
        if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        v.categoria.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        v.total.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        v.pagamento.toLowerCase().indexOf(q.toLowerCase()) > -1  ) {
          return true;
        }
        return false;
      }
    });
  
  
  }

  initializeItems(): void {
    this.countryList = this.loadedCountryList;
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
    if (Number(categoria) < 0){
      return("danger")
    }
    else{return("primary")}
  }

  copiar(item){
    this.comprass=item;
    delete this.comprass['key']
    this.dbService.save('compras',this.comprass);


  }

  Arredonda(val,val2){
    return (this.dbService.Arredonda(val,val2))
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
          }
        },
        {
          text: 'Comida',
          handler: data => {
            this.comprass.categoria = "Comida"; 
            this.dbService.save('compras',this.comprass)
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
