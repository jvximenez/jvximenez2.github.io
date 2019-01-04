import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule} from 'angularfire2';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ToastServiceProvider } from '../providers/toast-service/toast-service';
import { EditPage } from '../pages/edit/edit';
import { ConfiguraçõesPage } from '../pages/configura\u00E7\u00F5es/configura\u00E7\u00F5es';
import { EditConfPage } from '../pages/edit-conf/edit-conf';
import { EditPagamentoPage } from '../pages/edit-pagamento/edit-pagamento';
import { AnalisePage } from '../pages/analise/analise';
import { ChartsModule} from 'ng2-charts' ;
import { AnaliseCategoriaPage } from '../pages/analise-categoria/analise-categoria';
import { AnalisePagamentoPage } from '../pages/analise-pagamento/analise-pagamento';
import { PrevisãoPage } from '../pages/previs\u00E3o/previs\u00E3o';
import { AddPrevisãoPage } from '../pages/add-previs\u00E3o/add-previs\u00E3o';
import { GraficosPage } from '../pages/graficos/graficos';
import { EditAtalhoPage } from '../pages/edit-atalho/edit-atalho';
import { TodasAsComprasPage } from '../pages/todas-as-compras/todas-as-compras';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AnalisePage,
    HomePage,
    TabsPage,
    EditPage,
    ConfiguraçõesPage,
    EditConfPage,
    EditPagamentoPage,
    AnaliseCategoriaPage,
    AnalisePagamentoPage,
    PrevisãoPage,
    AddPrevisãoPage,
    GraficosPage,
    EditAtalhoPage,
    TodasAsComprasPage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCS77TuCe2jrXqmSDh9Ivs7gWedPM7PJ3E",
      authDomain: "ionic3-gastos-45fd4.firebaseapp.com",
      databaseURL: "https://ionic3-gastos-45fd4.firebaseio.com",
      projectId: "ionic3-gastos-45fd4",
      storageBucket: "ionic3-gastos-45fd4.appspot.com",
      messagingSenderId: "404912444334"
    }

    ),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AnalisePage,
    HomePage,
    TabsPage,
    EditPage,
    ConfiguraçõesPage,
    EditConfPage,
    EditPagamentoPage,
    AnaliseCategoriaPage,
    AnalisePagamentoPage,
    PrevisãoPage,
    AddPrevisãoPage,
    GraficosPage,
    EditAtalhoPage,
    TodasAsComprasPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToastServiceProvider
  ]
})
export class AppModule {}
