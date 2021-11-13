import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable, of, Observer } from 'rxjs';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers:[AuthService]
})
export class InicioComponent implements OnInit {
  public user$:Observable<any> = this.authSvc.afAuth.user;
  public userpermissioncontrolinventario=false;
  public userpermissioncotizaciones=false;
  public userpermissioncarrito=true;
  public userpermissionmiscompras=true;
  public userpermissionordenpago=false;
  constructor(private authSvc: AuthService,private router:Router) { }

  ngOnInit(): void {
    //setInterval(()=>{                         
      console.log('Permiso inventario: '+this.userpermissioncontrolinventario);
      //console.log(this.authSvc.afAuth.credential)
      this.authSvc.afAuth.onAuthStateChanged((user)=>{
        console.log(user)
        if(user!==null){
          // Diego: "s3OyXPySHPZqSQzTsMTehDdju4I3"
          // Daniel: "s3OyXPySHPZqSQzTsMTehDdju4I3"
          if(user.uid=='a0kDjOVej7TvdvuHKP7y6sUFyQG3'){
            console.log('puedes pasar')
            this.userpermissioncontrolinventario= true;
            this.userpermissioncotizaciones=true;
            this.userpermissionmiscompras=false;
            this.userpermissioncarrito=false;
            this.userpermissionordenpago=true;
          }
        }
      })
 //}, 3000);
  }
  async onLogout(){
    try{
      await this.authSvc.logout();
      this.userpermissioncontrolinventario= false;
      this.userpermissioncotizaciones=false;
      this.userpermissioncarrito=true;
      this.userpermissionmiscompras=true;
      this.userpermissionordenpago=false;
      this.router.navigate(['/login']);
    } catch(error){
      console.log(error);
    }
    this.authSvc.logout();
  }

  verificarAuth(){
    console.log('Permiso inventario: '+this.userpermissioncontrolinventario);
      //console.log(this.authSvc.afAuth.credential)
      this.authSvc.afAuth.onAuthStateChanged((user)=>{
        console.log(user)
        if(user!==null){
          if(user.uid=='a0kDjOVej7TvdvuHKP7y6sUFyQG3'){
            console.log('puedes pasar')
            this.userpermissioncontrolinventario= true;
            this.userpermissioncotizaciones=true;
            this.userpermissioncarrito=false;
            this.userpermissionmiscompras=false;
            this.userpermissionordenpago=true;
          }
        }
      })
  }

}
