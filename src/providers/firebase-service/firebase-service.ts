import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map, count } from 'rxjs/operators';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {
  private dbRef;
  private soma = 0;

  constructor(public db: AngularFireDatabase) {
    this.dbRef = this.db.list('compras')
  }

  getAll() {
    return this.db.list('compras').snapshotChanges().pipe(map(data => {
      return data.map(d => ({key: d.key, ...d.payload.val()}));
    }));
  }

  getAllCategoria() {
    return this.db.list('categorias').snapshotChanges().pipe(map(data => {
      return data.map(d => ({key: d.key, ...d.payload.val()}));
    }));
  }


  




  save(compras: any ){
    return this.db.list('compras')
      .push(compras)
      .then(r=> console.log(r));

  }

  saveCategoria(compras: any ){
    return this.db.list('categorias')
      .push(compras)
      .then(r=> console.log(r));

  }



  update(compras) {
    return this.dbRef
      .update(compras.key, compras)
      .then(r => console.log(r));

  }

  revome(compras){
    return this.dbRef
      .remove(compras.key)
      .then(r => console.log(r))
  }

  updatecat(cat) {
    return this.db.list('categorias')
      .update(cat.key, cat)
      .then(r => console.log(r));

  }

  revomecat(cat){
    return this.db.list('categorias')
      .remove(cat.key)
      .then(r => console.log(r))
  }

}
