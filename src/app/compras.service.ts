import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(public Http: HttpClient, private toastr: ToastrService) { }

  completarPago(cantidad:number, moneda: string, tokenID: string, descripcion: string,email:string | null){
    return this.Http.post(environment.stripeApiURL,{
      "amount": cantidad,
      "currency": moneda,
      "token": tokenID,
      "descripcion":descripcion,
      'email':email
    })
    .subscribe(
      (data: any) =>{
        (document.getElementById('loading') as HTMLButtonElement).style.display ='none';
        console.log("*********API RESPONDE*********");
        this.toastr.success('Pago realizado con exito. Gracias por comprar aqui', '¡Pedido Exitoso!',{
          positionClass:'toast-bottom-right'
        });
        console.log(JSON.stringify(data));
        setTimeout(() => { location.reload() }, 3000)
        //this.presentAlert('Pedido Exitoso!',`Pago realizado con exito. Gracias por comprar aqui.`);
      },
      (error: any)=>{
        (document.getElementById('loading') as HTMLButtonElement).style.display ='none';
        console.log("*********API RESPONDE ERROR*********");
        this.toastr.error('Intentelo denuevo mas tarde.', '¡Ha ocurrido un error!',{
          positionClass:'toast-bottom-right'
        });
        console.log(JSON.stringify(error));
        setTimeout(() => { location.reload() }, 3000)
        //this.presentAlert('Ups!...',`Ha ocurrido un error durante el pago, intentelo denuevo mas tarde.`);
      })
  }
}
