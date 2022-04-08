import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RegisterService } from '../../service/register/register.service';
import { Observable, ObservedValueOf } from 'rxjs';


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

export class RegisterUserComponent implements OnInit {
  regSuccess: number = 0;
  password: string = '';
  password2: string = '';

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(private regServ: RegisterService, private toastr: ToastrService) {}

  ngOnInit(): void {}

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
      if(item){
      }
    }


    this.regServ.sendRegisterData(this.registerForm.value).subscribe(
      (data) => {
        this.regSuccess = 1;
        this.success();
      },
      (error: HttpErrorResponse) => {
        this.regSuccess = 2;
        this.error();
      }
    );
  }

  success(): void {
    this.toastr.success('Registration Success!', `You have been successfully registered`);
  }

  passwordMatchError(): void {
    this.toastr.error('Registration Error', 'Entered passwords do not match')
  }

  error(): void {
    this.toastr.error('Registration error', 'There was a problem registering your account. Please try again.')
  }
}
