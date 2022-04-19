import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ChangeLastNameService } from 'src/app/service/change-last-name.service';

@Component({
  selector: 'app-change-last-name',
  templateUrl: './change-last-name.component.html',
  styleUrls: ['./change-last-name.component.css']
})
export class ChangeLastNameComponent   {

   constructor(private changelNameServ: ChangeLastNameService, private cookieServ: CookieService, private router: Router, private toastr: ToastrService) { }
  changeLastNameForm = new FormGroup({
    newLastName: new FormControl(''),
  })

  errorMessage:string = ''

  changeLastName() {

    let username = sessionStorage.getItem('username');
    let newLastName = this.changeLastNameForm.controls['newLastName'].value;

    this.errorMessage = ''
    this.changelNameServ.sendLastNameData(username, newLastName ).subscribe(
      (data) => {
        if(data){
          this.toastr.success('You have successfully changed your last name', `Last name Changed!`);
        }
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Failure', `Last name unable to be changed!`)
        console.log(error)
      }
    )
   }


}
