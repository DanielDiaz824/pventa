import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


//MODULOS
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

//COMPONENTES
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { CreateaccountComponent } from './componentes/createaccount/createaccount.component';
import { HomeComponent } from './componentes/home/home.component';
import { CarComponent } from './componentes/car/car.component';
import { ControliComponent } from './componentes/controli/controli.component';
import { CotizacionesComponent } from './componentes/cotizaciones/cotizaciones.component';
import { CrearProductosComponent } from './componentes/crear-productos/crear-productos.component';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './components/register/register.component';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { OlvidoContraComponent } from './auth/olvido-contra/olvido-contra.component';
import { ListadoclientesComponent } from './componentes/listadoclientes/listadoclientes.component';
import { CrearclienteComponent } from './componentes/crearcliente/crearcliente.component';
import { CrearCotizacionComponent } from './componentes/crear-cotizacion/crear-cotizacion.component';

import {AuthService} from './auth/services/auth.service';

// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { NgxStripeModule } from 'ngx-stripe';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MisComprasComponent } from './componentes/mis-compras/mis-compras.component';
import { OrdenPagoComponent } from './componentes/orden-pago/orden-pago.component';

// If any issue using previous fonts import. you can try this:
// import pdfFonts from "pdfmake/build/vfs_fonts";

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    CreateaccountComponent,
    HomeComponent,
    CarComponent,
    ControliComponent,
    CotizacionesComponent,
    CrearProductosComponent,
    RegisterComponent,
    SendEmailComponent,
    OlvidoContraComponent,
    ListadoclientesComponent,
    CrearclienteComponent,
    CrearCotizacionComponent,
    MisComprasComponent,
    OrdenPagoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_51Ju4X9C4UcuLTZ8wHqlvA9dGWAJjhFdY0osA7qP80muBsUk0ZySgpNGIYZ3EaRPuyMKM1tCqO9f4UwjJB57y4Hul00uIYbM6Cn'),
    NgbModule
  ],
  providers: [AuthService, InicioComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
