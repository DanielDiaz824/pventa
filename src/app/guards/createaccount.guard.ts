import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateaccountGuard implements CanActivate {
  constructor(private authSvc:AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authSvc.afAuth.user.pipe(
        map(user=>{
          if(user){
            alert('USTED Ya ESTÁ LOGUEADO! >:C')
            this.router.navigate(['/home']);
            return false;
          }
          return true;
        })
      );
  }
  
}
