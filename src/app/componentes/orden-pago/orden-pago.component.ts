import { Component, OnInit } from '@angular/core';
import { PagosAdminService } from '../../pagos-admin.service';

@Component({
  selector: 'app-orden-pago',
  templateUrl: './orden-pago.component.html',
  styleUrls: ['./orden-pago.component.css']
})
export class OrdenPagoComponent implements OnInit {

  Mcompras: any[]=[]
  idUser: string = ''
  constructor(private _pagoAdminService: PagosAdminService) { }

  ngOnInit(): void {
    this.obtenerOrdenPago();
  }

  obtenerOrdenPago(){
    this._pagoAdminService.getOrdenPago().subscribe((data)=>{
      data.forEach((element:any) => {
        this.Mcompras.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.Mcompras);
      /*
      if(data.data()!==undefined && data.data()!==null){
        this.Mcompras=data.data().compras;
        console.log(data.data().compras[0].Estado);
        console.log(this.Mcompras);
      }else{   
      }*/
    });
  }

}
