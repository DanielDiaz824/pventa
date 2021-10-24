import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goListadoClientes(){
    this.router.navigate(['/listadoclientes']).then(()=>{
      location.reload();
    })
  }

}
