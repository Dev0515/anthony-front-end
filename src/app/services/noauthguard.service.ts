import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class NoAuthguardService {

  constructor(private router: Router) { }

  canActivate() {
    let token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['home']);
        return false;
    } else {
        return true;
    }
  }
}
