import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserRoles } from '@app/_models/user';
import { AuthenticationService } from '@app/_services/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isUser = this.authService.getCurrentUserRoles().includes(UserRoles.USER);
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      let currentUrl = route.url.join('');
      //return this.router.parseUrl(`/login?afterLoginUrl=${currentUrl}`);
      this.router.navigate(['/login'], { queryParams: { afterLoginUrl: currentUrl } });
      return false;
    }

    if (isAuthenticated && isUser) {
      return true;
    }

    return this.router.createUrlTree(['/']);
  }

}
