import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PagosAdminService {

  constructor(private firestore: AngularFirestore, private toastr: ToastrService) { }

  agregarPago(compra:any[], idUser:any):Promise<any>{
    return this.firestore.collection('compras').doc(idUser).set({
      compras:compra
    }).then(() => {
      (document.getElementById('loading') as HTMLButtonElement).style.display ='none';
      console.log("Document successfully written!");
      this.toastr.info('Proceso 2 validado.', 'Proceso 3/3',{
        positionClass:'toast-bottom-right'
      });
      this.toastr.success(`Pago realizado con exito. En los siguientes dias nos pondremos en contacto con usted.\n Tambien nos puede encontrar en nuestras redes sociales.`,'Pedido Exitoso!',{
        positionClass:'toast-bottom-right',
        timeOut:8000
      });
      setTimeout(() => { location.reload() }, 8000)
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
  }
  getCompras(idUser:any){
    return this.firestore.collection('compras').doc(idUser).get();
  }
}
