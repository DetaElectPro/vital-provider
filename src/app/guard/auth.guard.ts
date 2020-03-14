import {Injectable} from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree, Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../Service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    // canActivate(
    //     next: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //     return true;
    // }

    constructor(
        public auth: AuthService,
        public router: Router
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise((resolve, reject) => {
            this.auth.isAuthenticated()
                .then(isAuthenticated => {
                    if (!isAuthenticated) {
                        this.router.navigate(['login']);
                    }
                    resolve(true);
                })
                .catch(error => {
                    return (false);
                });
        });
    }
}
