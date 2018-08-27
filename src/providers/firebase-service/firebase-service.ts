import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {
  private dbRef;

  constructor(public db: AngularFireDatabase) {
    this.dbRef = this.db.list('course')
    console.log('Hello FirebaseServiceProvider Provider');
  }

  getAll() {
    return this.db.list('course').snapshotChanges().pipe(map(data => {
      return data.map(d => ({key: d.key, ...d.payload.val()}));
    }));
  }




  save(course: any ){
    return this.dbRef
      .push(course)
      .then(r=> console.log(r));

  }



  update(course) {
    return this.dbRef
      .update(course.key, course)
      .then(r => console.log(r));

  }

  revome(course){
    return this.dbRef
      .remove(course.key)
      .then(r => console.log(r))
  }

}
