import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { loginComponent } from '../user/login/login.component';

let token = '';
if (sessionStorage['token']){
    token = JSON.parse(sessionStorage['token']).token
}


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: loginComponent) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean { 
     if(token != ''){
      return true;
      } else {
      return this.router.navigate(['login'])
      }
  }
}