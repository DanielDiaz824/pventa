import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';


@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {
  clientes: any [] = [];

  constructor(private router: Router, private _clientesService:ClientesService) { }

  ngOnInit(): void {
    this.getClientes();
  }
  goListadoClientes(){
    this.router.navigate(['/listadoclientes']).then(()=>{
      location.reload();
    })
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

}
