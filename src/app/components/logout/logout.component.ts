import { Component, OnInit,Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(private cookieServ: CookieService, private router: Router, @Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.logout({ returnTo: document.location.origin })
    sessionStorage.setItem('username', '');
    sessionStorage.setItem('password', '');
    this.cookieServ.delete('token', '/');
    this.router.navigate(['/login']);
  }
}
