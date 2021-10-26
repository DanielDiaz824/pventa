import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ControlService } from '../../services/control.service';
import { ToastrService } from 'ngx-toastr';
import { FirestorageService } from '../../services/firestorage.service';

@Component({
  selector: 'app-controli',
  templateUrl: './controli.component.html',
  styleUrls: ['./controli.component.css']
})
export class ControliComponent implements OnInit {
  producto:any[ ] = [ ]

  constructor(private _productoService:ControlService,
              private toastr:ToastrService,
              private firestorageService: FirestorageService) { 

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


  eliminarProducto(producto: any){
    this._productoService.eliminarProducto(producto.id).then(()=>{
      console.log('producto eliminado con exito');
      this.firestorageService.deleteImage(producto.foto);
      this.toastr.error('Se elimino el producto correctamente','Producto eliminado!',{
        positionClass:'toast-bottom-right'
      });
    }).catch(error=>{
      console.log(error);
    })
  }

}
