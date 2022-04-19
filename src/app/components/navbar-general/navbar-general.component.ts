import { Component} from '@angular/core';

@Component({
  selector: 'app-navbar-general',
  templateUrl: './navbar-general.component.html',
  styleUrls: ['./navbar-general.component.css']
})
export class NavbarGeneralComponent  {

  constructor() {
    //Get rid of the constructor?
  }

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
