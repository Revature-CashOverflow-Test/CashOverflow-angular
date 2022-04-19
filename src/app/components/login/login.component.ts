import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login/login.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { JwtDto } from 'src/app/model/jwt';
import { Router } from '@angular/router';
import { AuthClientConfig, AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/service/register/register.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUsername: string = '';
  loginPassword: string = '';
  data; //Used for logging in w/ auth0 purposes
  jwt: JwtDto | null = null;
  showErrorMessage: boolean = false;
  registerForm = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    auth0User: false,
  };

  audience = this.configFactory.get()?.audience;
  hasApiError = false;
  loggedInWithAuth0: boolean = false;

  setCookie(key: string, value: string) {
    this.cookieServ.set(key, value, undefined, '/');
  }

  formdata = new FormGroup({
    loginUsername: new FormControl(''),
    loginPassword: new FormControl(''),
  });
  constructor(
    private loginServ: LoginService,
    private cookieServ: CookieService,
    private router: Router,
    public auth: AuthService,
    private toastr: ToastrService,
    private configFactory: AuthClientConfig,
    private regServ: RegisterService
  ) {
    this.formdata = new FormGroup({
      loginUsername: new FormControl(),
      loginPassword: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      console.log('In Login Component');

      let username = sessionStorage.getItem('username');
      console.log(username);

      //If the username exists
      //It should be stopped so logged in users doon't log in
      if (username) {
        return;
      }

      //These 2 should always exist
      //If not, something about auth0 is weird and will need debugging

      //Checks to make sure sub and nickname exists.
      //They can not exists, and without this will login users as a unknown user
      if (profile?.sub && profile?.nickname) {
        //A security concern, should be fixed someother way
        //Perhaps let the database register users without passwords?
        this.loginUsername = profile?.nickname + profile?.sub;
        this.loginPassword = profile?.sub;
      }
      if (this.loginUsername.length < 1) {
        return;
      }

      //Login  for signing in
      this.data = {
        loginUsername: this.loginUsername, //This ensures all usernames are unique
        loginPassword: this.loginPassword,
      };
      this.data.loginUsername = this.data.loginUsername.substring(0, 19); //A username can only be 20 characters long
      //regristration info, shouldn't be used unless actually regristering though
      this.registerForm = {
        username: this.data.loginUsername,
        password: this.loginPassword,
        firstName: profile?.given_name || 'fName',
        lastName: profile?.family_name || 'LName',
        //This should always have an email, unless auth0 allows a service that doesn't have emails
        //If so, the email will be default to that
        email: profile?.email || 'fake@mail.com',
        auth0User: true,
      };

      //Only runs if there is a logged in user
      this.loggedInWithAuth0 = true;
      this.onClickSubmit(this.data);
    });
  }

  onClickSubmit(data: { loginUsername: any; loginPassword: any }) {
    this.loginUsername = data.loginUsername;
    this.loginPassword = data.loginPassword;
    sessionStorage.setItem('username', this.loginUsername);
    sessionStorage.setItem('password', this.loginPassword);
    this.retreiveLoginUserButton(this.loginUsername, this.loginPassword);
  }

  retreiveLoginUserButton(username: any, password: any) {
    console.log("I'm here");

    this.loginServ
      .retreiveLoginUser(username, password, this.loggedInWithAuth0)
      .subscribe(
        //subscriber's callback function goes here
        (data) => {
          this.jwt = data;
          this.setCookie('token', 'Bearer ' + this.jwt.jwt);
          this.router.navigate(['/feed']);
          this.success();
        },
        (_msg) => {
          if (!this.loggedInWithAuth0) {
            this.showErrorMessage = true;
          }
          this.error();
        }
      );
  }

  loginWithAuth() {
    this.loggedInWithAuth0 = true;
    this.auth.loginWithPopup();
  }

  success(): void {
    this.toastr.success(
      'Login Success!',
      `You have been successfully logged in as: ${this.loginUsername}`
    );
  }

  error(): void {
    if (!this.loggedInWithAuth0) {
      this.toastr.error(
        'Login Error',
        'Password/Username authentication error'
      );
    } else {
      //This should only ever run if a user is not already registered
      //In the database with Auth0

      for (let item in this.registerForm) {
        if (item) {
          //Also, no idea why, but this needs to be here
          //Don't remove unless you want to debug this
        }
      }

      this.regServ.sendRegisterData(this.registerForm).subscribe(
        (_data) => {
          //No reason to show a succesful regristration
          //For when you are logging in through Auth0
          // this.success(sl);
          //If a succesful regristration, login the user
          //No need for them to register and then sign in
          this.onClickSubmit(this.data);
        },
        (error: HttpErrorResponse) => {
          this.auth0Error();
          console.log("Can't register for some reason");
          console.log(error);
        }
      );
    }
  }
  auth0Error(): void {
    this.toastr.error(
      'Register Error',
      'Unable to register an account or login with Auth0. Please try again later or contact technical support.'
    );
  }
}
