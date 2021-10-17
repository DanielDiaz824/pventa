import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ControlService } from '../../services/control.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-controli',
  templateUrl: './controli.component.html',
  styleUrls: ['./controli.component.css']
})
export class ControliComponent implements OnInit {
  producto:any[ ] = [ ]

  constructor(private _productoService:ControlService,
              private toastr:ToastrService) { 

  }

  ngOnInit(): void {
    this.getProductos()
  }


  getProductos(){
    this._productoService.getProductos().subscribe(data=>{
      this.producto=[];
      data.forEach((element:any) => {
        this.producto.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.producto);
    })
  }


  eliminarProducto(id: string){
    this._productoService.eliminarProducto(id).then(()=>{
      console.log('producto eliminado con exito');
      this.toastr.error('Se elimino el producto correctamente','Producto eliminado!',{
        positionClass:'toast-bottom-right'
      });
    }).catch(error=>{
      console.log(error);
    })
  }

}
