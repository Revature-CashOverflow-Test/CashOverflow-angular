import { ChangePasswordService } from './../../service/change-password/change-password.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  numberOfAttempts:number = 5;
  changePasswordSuccess:number = 0
  numberOfSpecialCharacter:number = 0
  numberOfNumbers:number = 0
  numberOfCapitalCharacters = 0

  specialValid:boolean = false
  numberValid:boolean = false
  capitalCharactersValid:boolean = false

  errorMessage:string = ''

  changePasswordForm = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
    retypePassword: new FormControl(''),
  })

  constructor(private changePassServ: ChangePasswordService, private cookieServ: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  changePassword(){

    let password = sessionStorage.getItem('password')
    let username = sessionStorage.getItem('username')

    if(this.changePasswordForm.controls['currentPassword'].value == password){

      if(this.changePasswordForm.controls['newPassword'].value == this.changePasswordForm.controls['retypePassword'].value){

        let newPassword = this.changePasswordForm.controls['newPassword'].value

        if(newPassword.length > 7){

          for(let i in newPassword){

            var specialCharactersPattern = /^[!@#\$%\^\&*\)\(+=._-]$/g
            if(specialCharactersPattern.test(newPassword[i])){
              this.numberOfSpecialCharacter++
              if(this.numberOfSpecialCharacter >= 2){
                this.specialValid = true
              }
            }

            var numberPattern = /^[0-9]$/g
            if(numberPattern.test(newPassword[i])){
              this.numberOfNumbers++
              if(this.numberOfNumbers >= 2){
                this.numberValid = true
              }
            }

            var numberPattern = /^[A-Z]$/g
            if(numberPattern.test(newPassword[i])){
              this.numberOfCapitalCharacters++
              if(this.numberOfCapitalCharacters >= 2){
                this.capitalCharactersValid = true
              }
            }

          }

          if(this.specialValid && this.numberValid && this.capitalCharactersValid){
            this.errorMessage = ''
            this.changePassServ.sendPasswordData(username, newPassword).subscribe(
              (data) => {
                this.changePasswordSuccess = 1
              },
              (error: HttpErrorResponse) => {
                this.changePasswordSuccess = 2
              }
            )
          }else{
            this.errorMessage = 'The new password must contain at least two special characters, Two numbers and two capital characters.'
          }

        }else{
          this.errorMessage = 'The password must be at least 8 characters long.'
        }


      }else{
        this.errorMessage = 'The passwords do not match.'
      }
    }else{
      if(this.numberOfAttempts != 0){
        this.errorMessage = `The current password doesnt match ${this.numberOfAttempts} attenpts remaining.`
        this.numberOfAttempts--;
      }else{
        this.cookieServ.delete('token', '/');
        this.router.navigate(['/login']);
      }

    }


  }

}
