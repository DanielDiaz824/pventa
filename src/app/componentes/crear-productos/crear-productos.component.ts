import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent implements OnInit {
  createProducto:FormGroup;
  submitted = false;
  loading = false;
  id:string| null;
  titulo='Agregar Producto';
  constructor(private fb:FormBuilder,
              private _productoService:ControlService,
              private router:Router,
              private toastr: ToastrService,
              private aRoute:ActivatedRoute) {
    this.createProducto = this.fb.group({
      nombre:['',Validators.required],
      descripcion:['',Validators.required],
      preciounitario:['',Validators.required],
      precioproveedor:['',Validators.required],
      existentes:['',Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
   }

  ngOnInit(): void {
    this.esEditar();
  }


  agregarEditarProducto(){
    this.submitted = true;

    if(this.createProducto.invalid){
      return;
    }
    if(this.id===null){
      this.agregarProducto();
    }else{
      this.editarProducto(this.id);
    }
  }
  
  agregarProducto(){
    const producto:any = {
      nombre:this.createProducto.value.nombre,
      descripcion:this.createProducto.value.descripcion,
      preciounitario:this.createProducto.value.preciounitario,
      precioproveedor:this.createProducto.value.precioproveedor,
      existentes:this.createProducto.value.existentes,
      fechaCreacion: new Date (),
      fechaActualizacion: new Date()
    }

    this.loading = true;

    this._productoService.agregarProducto(producto).then(()=>{
      this.toastr.success('El producto se registro con exito', '¡Producto registrado!',{
        positionClass:'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/controlinventario'])
    }).catch(error=>{
      console.log(error);
      this.loading=false;
    })
  }

  editarProducto(id:string){
    const producto:any = {
      nombre:this.createProducto.value.nombre,
      descripcion:this.createProducto.value.descripcion,
      preciounitario:this.createProducto.value.preciounitario,
      precioproveedor:this.createProducto.value.precioproveedor,
      existentes:this.createProducto.value.existentes,
      fechaActualizacion: new Date()
    }
    this.loading=true;
    this._productoService.actualizarEmpleado(id,producto).then(()=>{
      this.loading=false;
      this.toastr.info('El producto se modifico con exito', '¡Producto modificado!',{
        positionClass:'toast-bottom-right'
      });
      this.router.navigate(['/controlinventario']);
    })
  }

  esEditar(){
    this.titulo = 'Editar Producto'
    if (this.id!==null){
      this.loading=true;
      this._productoService.getProducto(this.id).subscribe(data=>{
        this.loading=false;
        console.log(data.payload.data()['nombre']);
        this.createProducto.setValue({
          nombre:data.payload.data()['nombre'],
          descripcion:data.payload.data()['descripcion'],
          preciounitario:data.payload.data()['preciounitario'],
          precioproveedor:data.payload.data()['precioproveedor'],
          existentes:data.payload.data()['existentes']
          
        })
      })
    }
  }


}
