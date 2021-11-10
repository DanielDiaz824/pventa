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
    private fb: FormBuilder, private stripeService: StripeService, private compra: ComprasService, private modalService: NgbModal) { }

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
      console.log("Tu respuesta ha sido: " + r);
      if(r==1){
        console.log('Continua dice');
        (document.getElementById('realizarPago') as HTMLButtonElement).disabled = false;
        (document.getElementById('vaciarCar') as HTMLButtonElement).disabled = true;
        (document.getElementById('verTotal') as HTMLButtonElement).disabled = true;
      }
    }, error => {
      console.log(error);
    });
  }
   async createToken() {
      let i: number=0;
      const j = this.carritoProductos.length;
      let textoCompra: string="";
      do{
        textoCompra = textoCompra + this.carritoProductos[i].nombre + ' X '+this.carritoProductos[i].cantidad + " = "+ this.carritoProductos[i].totalWithIVA+'\n';
        i++
      }while(i<j);
      textoCompra = textoCompra;
    (document.getElementById('realizarPago') as HTMLButtonElement).disabled = true;
    const name = this.stripeTest.get('name')!.value;
    (document.getElementById('loading') as HTMLButtonElement).style.display ='inline-block';
     this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
          this.compra.completarPago((this.acumuladoTotalWithIVA*100),"MXN",result.token.id,textoCompra,this.emailUser);
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
}
