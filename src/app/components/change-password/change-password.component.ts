import { ChangePasswordService } from './../../service/change-password/change-password.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private changePassServ: ChangePasswordService, private cookieServ: CookieService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  changePassword(){

    let password = sessionStorage.getItem('password')
    let username = sessionStorage.getItem('username')

    if (this.changePasswordForm.controls['currentPassword'].value != password) {
      if(this.numberOfAttempts != 0){
        this.errorMessage = `The current password doesnt match ${this.numberOfAttempts} attempts remaining.`
        this.numberOfAttempts--;
      }else{
        this.cookieServ.delete('token', '/');
        this.router.navigate(['/login']);
      }
      return;
    }
    if (this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['retypePassword'].value) {
      this.errorMessage = 'The passwords do not match.'
      return;
    }

    let newPassword = this.changePasswordForm.controls['newPassword'].value

    if (newPassword.length <= 7) {
      this.errorMessage = 'The password must be at least 8 characters long.'
      return;
    }

    var specialCharactersPattern = /^[!@#\$%\^\&*\)\(+=._-]$/g
    var numberPattern = /^[0-9]$/g
    var upperPattern = /^[A-Z]$/g
    for (let i in newPassword) {
      if(specialCharactersPattern.test(newPassword[i])){
        this.numberOfSpecialCharacter++
      }
      else if(numberPattern.test(newPassword[i])){
        this.numberOfNumbers++
      }
      else if(upperPattern.test(newPassword[i])){
        this.numberOfCapitalCharacters++
      }
    }

    if(this.numberOfSpecialCharacter >= 2){
      this.specialValid = true
    }
    if(this.numberOfNumbers >= 2){
      this.numberValid = true
    }
    if(this.numberOfCapitalCharacters >= 2){
      this.capitalCharactersValid = true
    }

    if (!this.specialValid || !this.numberValid || !this.capitalCharactersValid) {
      this.errorMessage = 'The new password must contain at least two special characters, Two numbers and two capital characters.'
      return;
    }

    this.errorMessage = ''
    this.changePassServ.sendPasswordData(username, newPassword).subscribe(
      (data) => {
        if(data){
          this.toastr.success('You have successfully changed your password. Please log back in with your new password.', `Password Changed!`);
          this.cookieServ.delete('token', '/');
          this.router.navigate(['/login']);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    )





  }

}
