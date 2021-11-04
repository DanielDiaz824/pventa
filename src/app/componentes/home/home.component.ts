import { Component, OnInit } from '@angular/core';
import { ControlService } from '../../services/control.service';
import { CarritoService } from '../../carrito.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  producto:any[ ] = [ ]
  carritoProductos:any[ ] = [ ];
  loading = false;
  idUser: string ='';
  productoExistente= false;
  carritoExistente=false;
  constructor(private _productoService:ControlService, private _carritoService: CarritoService, private toastr: ToastrService, private authSvc: AuthService ) { }

  ngOnInit():void {
    this.obtenerCarritoInicio();
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

  async agregarCarrito(producto: any){
    if(this.carritoExistente!=false){
    await this.verificarProducto(producto);
    }
    if(this.productoExistente!=true){
     this.carritoProductos.push(producto);
      console.log('Carrito');
      console.log(this.carritoProductos);
      console.log(producto)
    this._carritoService.agregarCarrito(this.carritoProductos, this.idUser).then(()=>{
      this.toastr.success('Producto agregado al carrito', '¡Producto agregado!',{
        positionClass:'toast-bottom-right'
      });
      this.loading = false;
      console.log('Carrito Ahora')
      this.obtenerCarrito();
    }).catch((error: any)=>{
      console.log(error);
      this.loading=false;
    })
  }else{
    console.log('Ya existente');
    this.productoExistente=false;
  }
  }


  async obtenerCarritoInicio(){
   await this.authSvc.afAuth.onAuthStateChanged((user)=>{
      if(user!==null){
        this.idUser=user.uid
        console.log(this.idUser);
     this._carritoService.getCarrito(this.idUser).subscribe((data)=>{
       console.log(data.data())
       if(data.data()==undefined){
         console.log('No hay Carrito')
         this.carritoExistente=false;
       }else{
         this.carritoExistente=true;
      this.carritoProductos=data.data().productos;
      console.log('Carrito Antes')
      console.log(this.carritoProductos);
      }
    })
  }
  })
  }
  async obtenerCarrito(){
    await this._carritoService.getCarrito(this.idUser).subscribe((data)=>{
      this.carritoProductos=data.data().productos;
      this.carritoExistente=true;
      console.log(this.carritoProductos);
    })
  }


  async verificarProducto(producto:any){
    var i=0
    do{
      if(producto.id== this.carritoProductos[i].id){
        this.toastr.error('Producto existente en el carrito','¡Producto ya en carrito!',{
          positionClass:'toast-bottom-right'
        })
        this.productoExistente=true;
        i=this.carritoProductos.length
      }else{
        console.log('Nel pastel')
        i=i+1
      }
    }while(i<this.carritoProductos.length)
    return;
  }
}
