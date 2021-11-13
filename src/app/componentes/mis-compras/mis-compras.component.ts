import { Component, OnInit } from '@angular/core';
import { PagosAdminService } from '../../pagos-admin.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent implements OnInit {

  Mcompras: any[]=[]
  idUser: string = ''
  constructor(private _pagoAdminService: PagosAdminService, private authSvc: AuthService) { }

  ngOnInit(): void {
     this.authSvc.afAuth.onAuthStateChanged((user)=>{
      if(user!==null && user!==undefined){
        this.idUser= user.uid
        this._pagoAdminService.getComprasCliente(this.idUser).subscribe((data)=>{
          console.log(data.data())
          if(data.data()!==undefined && data.data()!==null){
            this.Mcompras=data.data().compras;
            console.log(data.data().compras[0].Estado);
            console.log(this.Mcompras);
          }else{   
          }
        });
      }console.log(this.idUser);})
    
  }

}
