import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-crear-cotizacion',
  templateUrl: './crear-cotizacion.component.html',
  styleUrls: ['./crear-cotizacion.component.css']
})
export class CrearCotizacionComponent implements OnInit {
  clientes: any [] = [];
  producto: any [] = [];
  

  constructor(private router:Router, private _clientesService:ClientesService,private _productoService:ControlService) { }

  ngOnInit(): void {
    this.getClientes();
    this.getProductos();
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

  productoSeleccionado(){

  }

  clienteSeleccionado(){

  }
}