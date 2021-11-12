import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { CarritoService } from '../../carrito.service';
import { ToastrService } from 'ngx-toastr';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComprasService } from '../../compras.service';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ControlService } from '../../services/control.service';
import { PagosAdminService } from '../../pagos-admin.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  carritoProductos:any[ ] = [ ];
  idUser: string ='';
  emailUser: string |null = '';
  acumuladoSubTotal=0
  acumuladoTotalWithIVA=0

  createPay:FormGroup;
  submitted = false;
  verificarCantidadProductos= true;
  compraFinal: any[]=[];
  idCompraRealizadas: string='';
  @ViewChild(StripeCardComponent)
  card!: StripeCardComponent;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'auto'
  };

  stripeTest!: FormGroup;

  @ViewChild("myModalConf", {static: false}) myModalConf: TemplateRef<any> | undefined;
  constructor(private _carritoService: CarritoService, private authSvc: AuthService, private toastr: ToastrService,
    private fb: FormBuilder, private stripeService: StripeService, private compra: ComprasService,
    private modalService: NgbModal, private _productoService:ControlService, private _pagoAdminService: PagosAdminService) { 

      this.createPay = this.fb.group({
        nombre:['',Validators.required],
        direccion:['',Validators.required],
        telefono:['',Validators.required]
      })
    }

  ngOnInit(): void {
    (document.getElementById('realizarPago') as HTMLButtonElement).disabled = true;
    (document.getElementById('loading') as HTMLButtonElement).style.display ='none';
    this.obtenerCarritoInicio();
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    
  }
  mostrarModalConf(){
    this.modalService.open(this.myModalConf).result.then( r => {
      this.submitted = true;
      console.log("Tu respuesta ha sido: " + r);
      if(r==1){
        if(this.createPay.invalid){
          console.log(this.submitted);
          console.log(this.createPay.invalid)
          return this.mostrarModalConf();
        }
        console.log('Continua dice');
        (document.getElementById('realizarPago') as HTMLButtonElement).disabled = false;
        (document.getElementById('vaciarCar') as HTMLButtonElement).disabled = true;
        (document.getElementById('verTotal') as HTMLButtonElement).disabled = true;
      }
      this.submitted = false;
    }, error => {
      this.submitted = false;
      console.log(error);
    });
  }

  async verificarCantidad(){
    console.log(this.carritoProductos.length);
    var i=0;
    do{
      console.log(this.carritoProductos[i])
      await this._productoService.getProductoPago(this.carritoProductos[i].id).toPromise().then((data:any)=>{
        if(data.data()==undefined){
          console.log('Producto no existe')
          this.toastError('El producto '+ this.carritoProductos[i].nombre+ ' ya no se encuentra disponible, vacíe el carrito para continuar.','¡Ha ocurrido un error!');
          this.verificarCantidadProductos= false;
          console.log(data.data());
          (document.getElementById('loading') as HTMLButtonElement).style.display ='none';
          setTimeout(() => { location.reload() }, 3000);
        }else{
      console.log(data.data().precioproveedor);
      console.log(this.carritoProductos[i])
     if(this.carritoProductos[i].precioproveedor == data.data().precioproveedor &&
      this.carritoProductos[i].preciounitario == data.data().preciounitario &&
      this.carritoProductos[i].descripcion == data.data().descripcion &&
      this.carritoProductos[i].nombre == data.data().nombre &&
      this.carritoProductos[i].foto == data.data().foto ){
        console.log('El producto se encuentra actualizado');
        var cantidadFinal= 0;
        cantidadFinal = data.data().existentes -this.carritoProductos[i].cantidad;
        console.log(cantidadFinal);
        if(data.data().existentes==0){
          this.toastError('El producto '+ this.carritoProductos[i].nombre+ ' se encuentra agotado, vacíe el carrito para continuar.','¡Ha ocurrido un error!');
          this.verificarCantidadProductos= false;
          console.log('Agotado');
          (document.getElementById('loading') as HTMLButtonElement).style.display ='none';
          setTimeout(() => { location.reload() }, 3000);
        }else{
        if(cantidadFinal>=0){
          this.carritoProductos[i].cantidadPostCompraProducto = cantidadFinal;
          console.log('Puede seguir la compra');
          
        }else{
          this.toastError('Hay '+data.data().existentes+' '+this.carritoProductos[i].nombre+ ' en existencia , ingrese una cantidad valida para continuar.','¡Ha ocurrido un error!');
          this.verificarCantidadProductos= false;
          console.log('No hay mas');
          (document.getElementById('loading') as HTMLButtonElement).style.display ='none';
          setTimeout(() => { location.reload() }, 3000);
        }
      }
      }else{
        console.log('El producto se encuentrá desactualizado');
        this.toastError('El producto '+ this.carritoProductos[i].nombre+ ' se encuentra desactualizado, vacíe el carrito y vuelta a intentarlo.','¡Ha ocurrido un error!');
        this.verificarCantidadProductos= false;
        setTimeout(() => { location.reload() }, 3000);
      }
       }
      });
      i=i+1;
    }while(i!==this.carritoProductos.length);

  }
   async createToken() {
    (document.getElementById('realizarPago') as HTMLButtonElement).disabled = true;
    (document.getElementById('loading') as HTMLButtonElement).style.display ='inline-block';
    await this.verificarCantidad().finally(()=>{
    console.log('Debo aparecer al final');
    if(this.verificarCantidadProductos==true){
      let i: number=0;
      const j = this.carritoProductos.length;
      let textoCompra: string="";
      do{
        textoCompra = textoCompra + this.carritoProductos[i].nombre + ' X '+this.carritoProductos[i].cantidad + " = "+ this.carritoProductos[i].totalWithIVA+'\n';
        i++
      }while(i<j);
      textoCompra = textoCompra;
    const name = this.stripeTest.get('name')!.value;
     this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
          this.compra.completarPago((this.acumuladoTotalWithIVA*100),"MXN",result.token.id,textoCompra,this.emailUser).toPromise().then((result)=>{
            console.log(result);
            //PAGADO
            this.idCompraRealizadas=result.id;
            //(document.getElementById('loading') as HTMLButtonElement).style.display ='none';
            //this.toastSuccess('Pago realizado con exito. Gracias por comprar aqui', '¡Pedido Exitoso!');
            this.toastInfo('Proceso 1 validado.', 'Proceso 1/3');
            console.log(JSON.stringify(result));
            //setTimeout(() => { location.reload() }, 3000)
            //this.presentAlert('Pedido Exitoso!',`Pago realizado con exito. Gracias por comprar aqui.`);
            var actualizarCantidad=false;
            var obtenerCompras=false;
            this.actualizarProductoPostCompra().finally(()=>{ actualizarCantidad=true});
            this.obtenerCompraInicio().finally(()=>{obtenerCompras=true; });
              const esperacompra = setInterval(() => { 
              if(actualizarCantidad==true && obtenerCompras==true){
                clearInterval(esperacompra);
                var nuevaCompra ={
                  Productos: this.carritoProductos,
                  IDCompra: this.idCompraRealizadas,
                  FechaCreacion:new Date ().toLocaleDateString("es-MX",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric', second:'numeric', hour12:true}),
                  FechaActualizacion:new Date ().toLocaleDateString("es-MX",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric', second:'numeric', hour12:true}),
                  Cliente: this.createPay.value.nombre,
                  Correo:this.emailUser,
                  Direccion: this.createPay.value.direccion,
                  Telefono: this.createPay.value.telefono,
                  TotalWithIVA: this.acumuladoTotalWithIVA,
                  Estado:'Pagado'
                }
                console.log(this.compraFinal);
                this.compraFinal.push(nuevaCompra);
                console.log(this.compraFinal);
                this._pagoAdminService.agregarPago(this.compraFinal,this.idUser);   
              }
            }, 3000);  
          }).catch((error)=>{
            console.log(error);
            (document.getElementById('loading') as HTMLButtonElement).style.display ='none';
            console.log("*********API RESPONDE ERROR*********");
            this.toastError('Intentelo denuevo mas tarde.', '¡Ha ocurrido un error!');
            console.log(JSON.stringify(error));
            setTimeout(() => { location.reload() }, 3000)
            //this.presentAlert('Ups!...',`Ha ocurrido un error durante el pago, intentelo denuevo mas tarde.`);
          })
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
          this.toastr.error(result.error.message, '¡Ha ocurrido un error!',{
            positionClass:'toast-bottom-right'
          });
          (document.getElementById('loading') as HTMLButtonElement).style.display ='none';
          (document.getElementById('realizarPago') as HTMLButtonElement).disabled = false;
        }
      });
    }})
  }
  

  async obtenerCarritoInicio(){
    await this.authSvc.afAuth.onAuthStateChanged((user)=>{
       if(user!==null){
         this.idUser=user.uid;
         this.emailUser=user.email;
         console.log(this.emailUser)
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
   async obtenerCompraInicio(){
     console.log(this.idUser);
     await this._pagoAdminService.getCompras(this.idUser).subscribe((data:any)=>{
      console.log(data.data().compras)
       if(data.data().compras==undefined){
         console.log('No hay Compras')
       }else{
       this.compraFinal=data.data().compras;
       console.log('Compras Antes')
       console.log(this.compraFinal);
       }
     })
   }

   async actualizarProductoPostCompra(){
    var i =0;
    do{
    await this._productoService.actualizarProductoPostCompra(this.carritoProductos[i].id,this.carritoProductos[i].cantidadPostCompraProducto).then((result:any)=>{
      console.log(result);
      //Productos actualizados en cantidad de existencia
    }).catch((error)=>{
      console.log(error);
    });
    i=i+1;
  }while(i!==this.carritoProductos.length);
  this.toastInfo('Proceso 2 validado.', 'Proceso 2/3');
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
  //alert('Listo para pagar, fijate en la consola despues del texto "Listo para pagar", Daniel');
  this.mostrarModalConf();
  //(document.getElementById('realizarPago') as HTMLButtonElement).disabled = false;
  //(document.getElementById('vaciarCar') as HTMLButtonElement).disabled = true;
  //(document.getElementById('verTotal') as HTMLButtonElement).disabled = true;
  //Generar PDF
  }else{
    //alert('Verifica')
    this.toastr.error('Verifica los datos e intentalo denuevo.', '¡Ha ocurrido un error!',{
      positionClass:'toast-bottom-right'
    });
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
  toastSuccess(mensaje: any, titulo:any){
    this.toastr.success(mensaje, titulo,{
      positionClass:'toast-bottom-right'
    });
  }
  toastError(mensaje: any, titulo:any){
    this.toastr.error(mensaje, titulo,{
      positionClass:'toast-bottom-right'
    });
  }
  toastInfo(mensaje: any, titulo:any){
    this.toastr.info(mensaje, titulo,{
      positionClass:'toast-bottom-right'
    });
  }
}
