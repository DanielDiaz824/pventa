import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ControlService } from '../../services/control.service';
import { FirestorageService } from '../../services/firestorage.service';

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
  //titulo='Agregar Producto';
  titulo='';
  newfile='';
  changeFile=false;
  imagen: any;
  newImage='';
  imagenNEWProduct:any;
  constructor(private fb:FormBuilder,
              private _productoService:ControlService,
              private router:Router,
              private toastr: ToastrService,
              private aRoute:ActivatedRoute,
              private firestorageService: FirestorageService) {
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
    console.log(this.router.url);
    if(this.router.url=='/crearproducto'){
      this.titulo='Agregar Producto'
    }else{
      this.esEditar();
    }
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
  
  async agregarProducto(){
    this.loading = true;
    const path = 'Productos';
    const name = this.createProducto.value.nombre;
    const imageNewProduct = await this.firestorageService.uploadImage(this.newfile, path, name);
    console.log(imageNewProduct)
    const producto:any = {
      nombre:this.createProducto.value.nombre,
      descripcion:this.createProducto.value.descripcion,
      preciounitario:this.createProducto.value.preciounitario,
      precioproveedor:this.createProducto.value.precioproveedor,
      existentes:this.createProducto.value.existentes,
      foto: imageNewProduct,
      fechaCreacion: new Date (),
      fechaActualizacion: new Date()
    }
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

  async editarProducto(id:string){
    this.loading = true;
    const path = 'Productos';
    const name = this.createProducto.value.nombre;
    if(this.changeFile!==false){
      console.log(this.newfile);
      this.imagenNEWProduct= await this.firestorageService.uploadImage(this.newfile, path, name);
      console.log('Nueva imagen');
    }else{
      this.imagenNEWProduct=this.newImage
      console.log('Misma imagen');
    }
    
    const producto:any = {
      nombre:this.createProducto.value.nombre,
      descripcion:this.createProducto.value.descripcion,
      preciounitario:this.createProducto.value.preciounitario,
      precioproveedor:this.createProducto.value.precioproveedor,
      existentes:this.createProducto.value.existentes,
      foto: this.imagenNEWProduct,
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
        this.newImage= data.payload.data()['foto']
          console.log(this.newImage);
      })
    }
  }

  async newImageUpload(event: any){
    if(event.target.files && event.target.files[0]){
      this.changeFile=true;
      this.newfile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image)=>{
        this.imagen = image;
          console.log(this.imagen.currentTarget.result);
          this.newImage = this.imagen.currentTarget.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }


}
