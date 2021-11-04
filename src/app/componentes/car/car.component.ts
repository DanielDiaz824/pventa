import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { CarritoService } from '../../carrito.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  carritoProductos:any[ ] = [ ];
  idUser: string ='';
  acumuladoSubTotal=0
  acumuladoTotalWithIVA=0
  constructor(private _carritoService: CarritoService, private authSvc: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerCarritoInicio();
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
       }else{
       this.carritoProductos=data.data().productos;
       console.log('Carrito Antes')
       console.log(this.carritoProductos);
       }
     })
   }
   })
   }

   cantidadProducto(valor:any, producto:any){
    console.log(producto);
    console.log('Nueva cantidad:'+valor.target.valueAsNumber);
    //console.log(this.productosSeleccionadosVista.length);
    var produtoExistente=false;
    var i = this.carritoProductos.length;
    var j = i-1;
    if(i>0){
    do{
      if(this.carritoProductos[j].nombre!==producto.nombre){
        //console.log('Aqui no está');
      }else{
        console.log('Producto a cantidad a actualizar en la posicion: '+j);
        this.carritoProductos[j].cantidad=valor.target.valueAsNumber;
        this.carritoProductos[j].total=this.carritoProductos[j].cantidad*this.carritoProductos[j].preciounitario;
        var totalProducto= this.carritoProductos[j].total*1.16;
        totalProducto= +totalProducto.toFixed(2);
        this.carritoProductos[j].totalWithIVA= totalProducto;
        produtoExistente=true;
      }
      j=j-1;
      i=i-1;
    }while(i!==0 || produtoExistente!==true);
  }
  }

  verTotal(event:any){
  event.preventDefault();
  var i = this.carritoProductos.length;
    var j = i-1;
    var cantidadNegativa=false;
    if(i>0){
  do{
    if(this.carritoProductos[j].cantidad<=0 || this.carritoProductos[j].cantidad==undefined){
      cantidadNegativa=true;
    }else{
    }
    j=j-1;
    i=i-1;
  }while(i>0)
  if(cantidadNegativa!==true){
    console.log('Listo para pagar');
  console.log(this.carritoProductos)
  this.acumulado();
  alert('Listo para pagar, fijate en la consola despues del texto "Listo para pagar", Daniel');
  //Generar PDF
  }else{
    alert('Verifica')
  }
}
  }
 acumulado(){
  var i = 0;
  do{
    this.acumuladoSubTotal=this.acumuladoSubTotal+this.carritoProductos[i].total;
    this.acumuladoTotalWithIVA=this.acumuladoTotalWithIVA+this.carritoProductos[i].totalWithIVA;
    i=i+1;
  }while(i<this.carritoProductos.length)//5
  console.log('AcumuladoSubtotal: '+this.acumuladoSubTotal);
  console.log('AcumuladoTotalWithIVA: '+this.acumuladoTotalWithIVA);
  }

  vaciarCarrito(event: any){
    event.preventDefault();
    this._carritoService.vaciarCarrito(this.idUser).then(()=>{
      this.carritoProductos = [ ];
      this.idUser='';
      this.acumuladoSubTotal=0
      this.acumuladoTotalWithIVA=0
      this.obtenerCarritoInicio();
      this.toastr.success('Carrito vaciado', '¡Vacio!',{
        positionClass:'toast-bottom-right'
      });
    });
  }
}
