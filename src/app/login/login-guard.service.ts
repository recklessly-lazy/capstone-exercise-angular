import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';
@Injectable({
    providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) { }
    canActivate(): boolean {
        if (this.loginService.isUserLoggedIn()) {
            console.log("user is logged in");
            return true;
        }
        console.log("user not logged in, authentication failed !, returning to home page");
        this.router.navigate(['/home']);
        return false;
    }
}
