import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
// import { Login-page} from '/src/app/login/login-page/login-page.component'

@Injectable({
  providedIn: 'root',
})
export class loguinSecurityGuard implements CanActivate {
  constructor() {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      alert("hasUser -> "+this.hasUser());

    if (this.hasUser()) {
      return true;
    }
    window.location.href = '/denegado';
    // alert("no tiene token");
    return false;
  }

  hasUser(): boolean {
    const token = sessionStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  }
}
