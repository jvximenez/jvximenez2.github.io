import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { HomePage } from '../home/home';
import { EditConfPage } from '../edit-conf/edit-conf';

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
  public categoria = {
    'title': '',
    'numero': '',
    'icon':'',

  };



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dbService: FirebaseServiceProvider,
    public alertCtrl: AlertController) {

    this.categorias = this.dbService.getAll('categoria');

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
          text: 'Save',
          handler: data => {
            this.categoria.title = data.title, this.categoria.numero = data.numero, this.categoria.icon = data.icon;
            this.dbService.save('categoria',this.categoria);
            }
          }
      ]
    });
    prompt.present();
  }
  


  EditarCategoria(categoria){
    this.navCtrl.push(EditConfPage,
    {'categoria': categoria });
  }
}

