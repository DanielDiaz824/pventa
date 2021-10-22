import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crearcliente',
  templateUrl: './crearcliente.component.html',
  styleUrls: ['./crearcliente.component.css']
})
export class CrearclienteComponent implements OnInit {

  createcliente: FormGroup;
  submitted = false;
  loading = false;
  id:string | null;
  titulo='Agregar cliente';

  constructor(private fb:FormBuilder,
              private _clienteService:ClientesService,
              private router:Router,
              private toastr:ToastrService,
              private aRoute:ActivatedRoute) {
    this.createcliente = this.fb.group({
      nombres:['',Validators.required],
      apellidos:['',Validators.required],
      sexo:['',Validators.required],
      telefono:['',Validators.required],
      domicilio:['',Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    
   }

  ngOnInit(): void {
    console.log(this.router.url);
    if(this.router.url=='/crearcliente'){
      this.titulo='Agregar Cliente'
    }else{
      this.esEditar();
    }
  }

  agregarEditarCliente(){
    this.submitted = true;

    if(this.createcliente.invalid){
      return;
    }
    if(this.id===null){
      this.agregarCliente();
    }else{
      this.editarCliente(this.id);
    }
  }

  agregarCliente(){
    const cliente: any={
      nombres:this.createcliente.value.nombres,
      apellidos:this.createcliente.value.apellidos,
      sexo:this.createcliente.value.sexo,
      telefono:this.createcliente.value.telefono,
      domicilio:this.createcliente.value.domicilio,
      fechaCreacion: new Date(),
      fechaActualizacion:new Date()
    }
    this.loading = true;
    this._clienteService.agregarCliente(cliente).then(()=>{
      this.toastr.success('El cliente se registro correctamente','¡Cliente registrado!',{
        positionClass:'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/listadoclientes']);
    }).catch(error=>{
      console.log(error);
      this.loading = false;
    })
  }

  editarCliente(id:string){
    const cliente: any={
      nombres:this.createcliente.value.nombres,
      apellidos:this.createcliente.value.apellidos,
      sexo:this.createcliente.value.sexo,
      telefono:this.createcliente.value.telefono,
      domicilio:this.createcliente.value.domicilio,
      fechaActualizacion:new Date()
    }
    this.loading = true;
    this._clienteService.actualizarCliente(id,cliente).then(()=>{
      this.loading=false;
      this.toastr.info('El cliente se modifico con exito','¡Cliente modificado!',{
        positionClass:'toast-bottom-right'
      })
      this.router.navigate(['/listadoclientes']);
    })
  }

  esEditar(){
    this.titulo = 'Editar cliente'
    if (this.id!==null){
      this.loading = true;
      this._clienteService.getCliente(this.id).subscribe(data =>{
        this.loading = false;
        console.log(data.payload.data()['nombres']);
        this.createcliente.setValue({
          nombres:data.payload.data()['nombres'],
          apellidos:data.payload.data()['apellidos'],
          sexo:data.payload.data()['sexo'],
          telefono:data.payload.data()['telefono'],
          domicilio:data.payload.data()['domicilio']
        })
      })
    }
  }

}