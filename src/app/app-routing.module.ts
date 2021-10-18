import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch:'full'},
  {path:'car',component:CarComponent},
  {path:'createaccount',component:CreateaccountComponent},
  {path:'home',component:HomeComponent},
  {path:'inicio',component:InicioComponent},
  {path:'login',component:LoginComponent},
  {path:'controlinventario',component:ControliComponent, canActivate:[AuthGuard]},
  {path:'cotizaciones',component:CotizacionesComponent},
  {path:'crearproducto',component:CrearProductosComponent},
  {path:'editproducto/:id',component:CrearProductosComponent},
  {path:'verification-email',component:SendEmailComponent},

  {path:'**',redirectTo:'home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
