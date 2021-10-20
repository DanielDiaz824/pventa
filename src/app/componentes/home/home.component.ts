import { Component, OnInit } from '@angular/core';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  producto:any[ ] = [ ]

  constructor(private _productoService:ControlService) { }

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
}
