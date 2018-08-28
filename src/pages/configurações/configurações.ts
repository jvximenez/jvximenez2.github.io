import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dbService: FirebaseServiceProvider,
    public alertCtrl: AlertController) {

    this.compras = this.dbService.getAllCategoria();
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
          placeholder: 'Nome'
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
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}


