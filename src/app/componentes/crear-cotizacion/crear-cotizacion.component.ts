import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { ControlService } from '../../services/control.service';
import { PdfMakeWrapper, Table, Txt, Cell, Img } from 'pdfmake-wrapper';
import {ITable} from 'pdfmake-wrapper/lib/interfaces';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

PdfMakeWrapper.setFonts(pdfFonts);

interface DataResponse{
  nombre:string,
  preciounitario: number,
  cantidad: number,
  total: number
}

type TableRow = [string,number,number,number]
@Component({
  selector: 'app-crear-cotizacion',
  templateUrl: './crear-cotizacion.component.html',
  styleUrls: ['./crear-cotizacion.component.css']
})
export class CrearCotizacionComponent implements OnInit {
  clientes: any [] = [];
  producto: any [] = [];
  productosSeleccionadosVista: any [] = [];
  clienteNombre='';
  clienteTelefono='';
  clienteBoolean=false;
  productoBoolean=false;
  constructor(private router:Router, private _clientesService:ClientesService,private _productoService:ControlService) { }

  ngOnInit(): void {
    (document.getElementById('botonExportar') as HTMLButtonElement).disabled = true;
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

  productoSeleccionado(producto: any){
    (document.getElementById('botonExportar') as HTMLButtonElement).disabled = false;
    console.log(producto);
    console.log(this.productosSeleccionadosVista.length);
    var produtoExistente=false;
    var i = this.productosSeleccionadosVista.length;
    var j = i-1;
    if(i>0){
    do{
      if(this.productosSeleccionadosVista[j].nombre!==producto.nombre){
        console.log('No existe el producto');
      }else{
        console.log('Producto existente en la posicion: '+j);
        produtoExistente=true;
      }
      j=j-1;
      i=i-1;
    }while(i!=0);
  }
    if(produtoExistente!==true){
      this.productoBoolean=true;
    this.productosSeleccionadosVista.push({
      nombre:producto.nombre,
      preciounitario:producto.preciounitario,
      cantidad:0,
      total:0
    })
  }
    console.log(this.productosSeleccionadosVista);
  }

  clienteSeleccionado(cliente: any){
    this.clienteNombre=cliente.nombres+' '+cliente.apellidos;
    this.clienteTelefono=cliente.telefono;
    console.log(cliente)
    this.clienteBoolean=true;
  }
  verProductos(productos: any){
    alert('Boton meramente de prueba, será eliminado');
    console.log(productos);
  }
  cantidadProducto(valor:any, producto:any){
    console.log(producto);
    console.log('Nueva cantidad:'+valor.target.valueAsNumber);
    //console.log(this.productosSeleccionadosVista.length);
    var produtoExistente=false;
    var i = this.productosSeleccionadosVista.length;
    var j = i-1;
    if(i>0){
    do{
      if(this.productosSeleccionadosVista[j].nombre!==producto.nombre){
        //console.log('Aqui no está');
      }else{
        console.log('Producto a cantidad a actualizar en la posicion: '+j);
        this.productosSeleccionadosVista[j].cantidad=valor.target.valueAsNumber;
        this.productosSeleccionadosVista[j].total=this.productosSeleccionadosVista[j].cantidad*this.productosSeleccionadosVista[j].preciounitario;
        produtoExistente=true;
      }
      j=j-1;
      i=i-1;
    }while(i!==0 || produtoExistente!=true);
  }
}

async exportarCotizacion(){
    var i = this.productosSeleccionadosVista.length;
    var j = i-1;
    var cantidadNegativa=false;
    if(i>0){
  do{
    if(this.productosSeleccionadosVista[j].cantidad<=0){
      cantidadNegativa=true;
    }else{
    }
    j=j-1;
    i=i-1;
  }while(i>0)
  if(cantidadNegativa!=true  && this.clienteBoolean!=false && this.productoBoolean!=false){
  console.log(this.productosSeleccionadosVista)
  console.log(this.clienteNombre)
  console.log(this.clienteTelefono);
  console.log('Listo para generar PDF');
  alert('Listo para generar PDF');
  //Generar PDF
  const pdf = new PdfMakeWrapper();
  pdf.add(await new Img('./assets/img/vectornosek.svg').relativePosition(415,5).color('red').width(100).build())
  pdf.add(new Txt('COTIZACIONES').alignment('center').bold().fontSize(24).end);
  pdf.add('Datos del cliente:');
  pdf.add('Nombre Completo: ' +this.clienteNombre);
  pdf.add('Telefono: '+this.clienteTelefono);
  
  pdf.add(
      this.createTable(this.productosSeleccionadosVista)
  )
  pdf.create().open();
  }else{
    console.log('Verifica');
    alert('Verifica');
  }
}
}
  createTable(data: DataResponse[]): ITable{
    [{}]
    return new Table([
      ['NOMBRE','PRECIO UNITARIO','CANTIDAD','TOTAL'],
      ...this.datosAcomodados(data)
    ]).layout('lightHorizontalLines').widths('*').end
  }
  datosAcomodados(data:DataResponse[]): TableRow[]{
    return data.map(row=>[row.nombre,row.preciounitario,row.cantidad,row.total] as TableRow);
  }
}