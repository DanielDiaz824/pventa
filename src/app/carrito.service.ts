import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { setDoc } from '@firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private firestore: AngularFirestore) { }

  agregarCarrito(producto:any[], idUser:any):Promise<any>{
    return this.firestore.collection('carritos').doc(idUser).set({
      productos:producto
    }).then(() => {
      console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
  }

  getCarrito(id:string):Observable<any>{
    return this.firestore.collection('carritos').doc(id).get();
  }

  vaciarCarrito(id:string):Promise<any>{
    return this.firestore.collection('carritos').doc(id).delete();
  }
}
