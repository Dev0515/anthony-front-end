import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthguardService {

  constructor(private router: Router) { }

  canActivate() {
    let token = localStorage.getItem('token');
    if (token) {
        return true;
    } else {
        this.router.navigate(['login']);
        return false;
    }
  }

}
