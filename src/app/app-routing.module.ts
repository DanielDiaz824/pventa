import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CarComponent } from './componentes/car/car.component';
import { CreateaccountComponent } from './componentes/createaccount/createaccount.component';
import { HomeComponent } from './componentes/home/home.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { ControliComponent } from './componentes/controli/controli.component';
import { CotizacionesComponent } from './componentes/cotizaciones/cotizaciones.component';
import { CrearProductosComponent } from './componentes/crear-productos/crear-productos.component';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { AuthGuard } from './auth.guard';
import { OlvidoContraComponent } from './auth/olvido-contra/olvido-contra.component';
import { CotizacionesGuard } from './guards/cotizaciones.guard';
import { CrearproductoGuard } from './guards/crearproducto.guard';
import { EditproductoGuard } from './guards/editproducto.guard';
import { CarGuard } from './guards/car.guard';
import { CreateaccountGuard } from './guards/createaccount.guard';
import { ListadoclientesComponent } from './componentes/listadoclientes/listadoclientes.component';
import { CrearclienteComponent } from './componentes/crearcliente/crearcliente.component';
import { ListadoclientesGuard } from './guards/listadoclientes.guard';
import { CrearclienteGuard } from './guards/crearcliente.guard';
import { EditclienteGuard } from './guards/editcliente.guard';
import { CrearCotizacionComponent } from './componentes/crear-cotizacion/crear-cotizacion.component';
import { CrearcotizacionGuard } from './guards/crearcotizacion.guard';


const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch:'full'},
  {path:'car',component:CarComponent, canActivate:[CarGuard]},
  {path:'createaccount',component:CreateaccountComponent, canActivate:[CreateaccountGuard]},
  {path:'home',component:HomeComponent},
  {path:'inicio',component:InicioComponent},
  {path:'login',component:LoginComponent},
  {path:'controlinventario',component:ControliComponent, canActivate:[AuthGuard]},
  {path:'cotizaciones',component:CotizacionesComponent, canActivate:[CotizacionesGuard]},
  {path:'crearproducto',component:CrearProductosComponent, canActivate:[CrearproductoGuard]},
  {path:'editproducto/:id',component:CrearProductosComponent, canActivate:[EditproductoGuard]},
  {path:'verification-email',component:SendEmailComponent},
  //{path:'forgot-password', loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  {path:'olvido-contrasena',component:OlvidoContraComponent},
  {path:'listadoclientes',component:ListadoclientesComponent, canActivate:[ListadoclientesGuard]},
  {path:'crearcliente',component:CrearclienteComponent, canActivate:[CrearclienteGuard]},
  {path:'editcliente/:id',component:CrearclienteComponent, canActivate:[EditclienteGuard]},
  {path:'crear-cotizacion',component:CrearCotizacionComponent, canActivate:[CrearcotizacionGuard]},
  
  {path:'**',redirectTo:'home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
