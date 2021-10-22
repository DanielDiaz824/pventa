import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listadoclientes',
  templateUrl: './listadoclientes.component.html',
  styleUrls: ['./listadoclientes.component.css']
})
export class ListadoclientesComponent implements OnInit {
  clientes: any [] = [];


  constructor(private _clientesService:ClientesService,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(){
    this._clientesService.getClientes().subscribe(data=>{
      this.clientes = [];
      data.forEach((element:any) => {
        this.clientes.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.clientes);
    });
  }

  eliminarCliente(id:string){
    this._clientesService.eliminarCliente(id).then(()=>{
      console.log('Cliente eliminado');
      this.toastr.error('El cliente fue eliminado con exito','¡Cliente eliminado!',{
        positionClass:'toast-bottom-right'
      })
    }).catch(error=>{
      console.log(error);
    })
  }



}