import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { map, count } from 'rxjs/operators';
import firebase from 'firebase';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {
  private dbRef;
  
  

  constructor(public db: AngularFireDatabase) {
    
  }


  getAll(dado){
    return this.db.list(dado).snapshotChanges().pipe(map(data => {
      return data.map(d => ({key: d.key, ...d.payload.val()}));
    }));
  }

  getAllchild(dado){
    return this.db.list(dado).snapshotChanges().pipe(map(data => {
      return data.map(d => ({key: d.key, ...d.payload.val()}));
    }));
  }

  save(dado,compras: any ){
    return this.db.list(dado)
      .push(compras)
      .then(r=> console.log(r));

  }

  


  update(dado,compras) {
    return this.db.list(dado)
      .update(compras.key, compras)
      .then(r => console.log(r));

  }

  revome(dado,compras){
    return this.db.list(dado)
      .remove(compras.key)
      .then(r => console.log(r))
  }

  getArray(dado){
    var teste =  this.getAll(dado)
    var array = []
    teste.forEach(dado => dado.forEach(dado2 => array.push(dado2)));
    return (array)
    
  }

  getArray2(dado){
    var teste =  this.getAll(dado)
    var array = {}
    array = teste.forEach(dado => dado.forEach(dado2 =>{}));
    return (teste)
    
  }


  updateG(lista,compras) {
    return this.db.list(lista)
      .update(compras.key, compras)
      .then(r => console.log(r));

  }

}
