import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { HomePage } from '../home/home';
import { EditConfPage } from '../edit-conf/edit-conf';
import { EditPagamentoPage } from '../edit-pagamento/edit-pagamento';

/**
 * Generated class for the ConfiguraçõesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configurações',
  templateUrl: 'configurações.html',
})
export class ConfiguraçõesPage {

  public compras;
  public categorias;
  public pagamentos;
  public visuals;
  public atalhos;

  public categoria = {
    'title': '',
    'numero': '',
    'icon':'',

  };
  public pagamento ={
    'title': '',
    'numero':'',
    'icon':'',
  };

  public visual ={
    'ano':'',
    'mes':'',
    'final':'',
  }

  public atalho ={
    'title':'',
    'gasto':'',
    'categoria':'',
    'pagamento':'',
  }



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dbService: FirebaseServiceProvider,
    public alertCtrl: AlertController) {

    this.categorias = this.dbService.getAll('categoria');
    this.pagamentos =  this.dbService.getAll('pagamento');
    this.visuals = this.dbService.getAll('visual')
    this.atalhos = this.dbService.getAll('atalho')

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguraçõesPage');
  }

  NovaCategoria(){
    const prompt = this.alertCtrl.create({
      title: 'Nova Categora',
      message: "Entre com o nome, número e icone da categoria",
      inputs: [
        {
          name: 'title',
          placeholder: 'Nome',

        },
        {
          name: 'numero',
          placeholder:"Número"
        },
        {
          name: 'icon',
          placeholder: "Ícone"
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
          text: 'Categoria',
          handler: data => {
            this.categoria.title = data.title, this.categoria.numero = data.numero, this.categoria.icon = data.icon;
            this.dbService.save('categoria',this.categoria);
            }
          },
        {
          text: 'Pagamento',
          handler: data => {
            this.pagamento.title = data.title, this.pagamento.numero = data.numero, this.pagamento.icon = data.icon;
            this.dbService.save('pagamento',this.pagamento);
            }
          }
      ]
    });
    prompt.present();
  }


  NovaVisual(){
    const prompt = this.alertCtrl.create({
      title: 'Nova Visualização',
      message: "Entre com ano e mes",
      inputs: [
        {
          name: 'ano',
          placeholder: 'Ano',
          type: 'number',

        },
        {
          name: 'mes',
          placeholder:"Mes",
          type: 'number',

        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Adicionar',
          handler: data => {
            this.visual.ano = data.ano, this.visual.mes = data.mes, this.visual.final = ((data.ano) + (data.mes-1)/12);
            this.dbService.save('visual',this.visual);
            }
          }
      ]
    });
    prompt.present();
  }

  NovoAtalho(){
      const prompt = this.alertCtrl.create({
        title: 'Novo atalho',
        inputs: [
          {
            name: 'title',
            placeholder: 'Nome',
            type: 'text',
  
          },
          {
            name: 'Valor',
            placeholder:"Valor",
            type: 'number',
  
          },
          {
            name: 'Categoria',
            placeholder:"Categoria",
            type: 'text',
  
          },
          {
            name: 'Pagamentos',
            placeholder:"Pagamentos",
            type: 'text',
  
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
            text: 'Adicionar',
            handler: data => {
              this.atalho.title = data.title, this.atalho.gasto = data.Valor, this.atalho.categoria = data.Categoria, this.atalho.pagamento = data.Pagamentos;
              this.dbService.save('atalho',this.atalho);
              }
            }
        ]
      });
      prompt.present();
    }
  
  

  


  EditarCategoria(categoria){
    this.navCtrl.push(EditConfPage,
    {'categoria': categoria });
    console.log(categoria)
  }

  EditarPagamento(pagamento){
    this.navCtrl.push(EditPagamentoPage,
    {'pagamento': pagamento });
    
  }

  remove(a){
    this.dbService.revome('visual',a)
  }

  removeAtalho(a){
    this.dbService.revome('atalho',a)
  }
}

