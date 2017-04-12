import { Injectable } from '@angular/core';
import { 
  Router, 
  ActivatedRoute, 
  CanActivate, 
  RouterStateSnapshot, 
  ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ) {
    return this.authService.getAuth()
        .take(1)
        .map((state: any) => !!state)
        .do(authenticated => {
            if (!authenticated)
                this.router.navigate(['/login']);
        });
  }
}
