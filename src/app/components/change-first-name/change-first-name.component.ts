import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ChangeFirstNameService } from 'src/app/service/change-first-name.service';

@Component({
  selector: 'app-change-first-name',
  templateUrl: './change-first-name.component.html',
  styleUrls: ['./change-first-name.component.css']
})
export class ChangeFirstNameComponent  {
  constructor(private changefNameServ: ChangeFirstNameService, private cookieServ: CookieService, private router: Router, private toastr: ToastrService) { }
  changeFirstNameForm = new FormGroup({
    newFirstName: new FormControl(''),
  })

  errorMessage:string = ''

  changeFirstName() {
     let username = sessionStorage.getItem('username');
    let newFirstName = this.changeFirstNameForm.controls['newFirstName'].value;

    this.errorMessage = ''
    this.changefNameServ.sendFirstNameData(username, newFirstName ).subscribe(
      (data) => {
        if(data){
          this.toastr.success('You have successfully changed your First name', `First name Changed!`);
        }
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Failure', `First name unable to be changed!`)
        console.log(error)
      }
    )



  }


}
