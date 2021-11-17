import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserRoles } from '@app/_models/user';
import { AuthenticationService } from '@app/_services/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAdmin = this.authService.getCurrentUserRoles().includes(UserRoles.ADMIN);
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      let currentUrl = state.url;
      return this.router.parseUrl(`/login?afterLoginUrl=${currentUrl}`);
      //this.router.navigate(['/login'], { queryParams: { afterLoginUrl: currentUrl } });
    }

    if (isAuthenticated && isAdmin) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }

}
