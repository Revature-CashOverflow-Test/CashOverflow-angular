import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-navbar-login',
  templateUrl: './navbar-login.component.html',
  styleUrls: ['./navbar-login.component.css']
})
export class NavbarLoginComponent{

  constructor(public auth: AuthService) { }

  darkmodeOn = false;
  iconActive = `../../../assets/img/dollar-coin-stack-svgrepo-com.svg`;
  iconlight = `../../../assets/img/dollar-coin-stack-svgrepo-com.svg`;
  icondark = `../../../assets/img/dollar-coin-stack-svgrepo-com-gray.svg`;

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
    this.darkmodeOn = !this.darkmodeOn;

    if (!this.darkmodeOn) {
      this.iconActive = this.iconlight;
    }

    if (this.darkmodeOn) {
      this.iconActive = this.icondark;
    }
 }
}
