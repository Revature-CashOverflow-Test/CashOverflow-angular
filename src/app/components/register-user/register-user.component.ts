import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import {  HttpErrorResponse } from '@angular/common/http';
import {  FormControl, FormGroup } from '@angular/forms';
import { RegisterService } from '../../service/register/register.service';
import { Observable, ObservedValueOf } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';


/**
 * This component currently contains a bootstrap section and multitude of divs to
 * display a registration form and success/failure/mismatch states.
 * @author Cameron, Amir, Chandra
 */
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})

export class RegisterUserComponent{
  regSuccess: number = 0;
  password: string = '';
  password2: string = '';
  // profileJson: string = "";

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    auth0User: new FormControl(false),
  });

  constructor(private regServ: RegisterService, private toastr: ToastrService, private router: Router, private auth: AuthService) {}
  


  /**
   * Logic checks for password mismatch then calls the service method to send form data to the Java backend.
   * Also, handles errors thrown by Java and displays either success or failure states
   * @author Cameron, Amir, Chandra
   */
  register() {
    document.getElementById('password2')?.classList.remove('is-invalid');

    if (this.password != this.password2) {
      document.getElementById('password2')?.classList.add('is-invalid');
      this.regSuccess = 0;
      this.passwordMatchError();
      return;
    }



    for(let item in this.registerForm){
      if (item) {
        //Needed for some reason?
        //Breaks without this
      }
    }


    this.regServ.sendRegisterData(this.registerForm.value).subscribe(
      (_data) => {
        this.regSuccess = 1;
        this.success();

      },
      (_error: HttpErrorResponse) => {
        this.regSuccess = 2;
        this.error();
      }
    );
  }

  success(): void {
    this.toastr.success('Registration Success!', `You have been successfully registered`);
    this.router.navigateByUrl('/login');

  }

  passwordMatchError(): void {
    this.toastr.error('Registration Error', 'Entered passwords do not match')
  }

  error(): void {
    this.toastr.error('Registration error', 'There was a problem registering your account. Please try again.')
  }
}
