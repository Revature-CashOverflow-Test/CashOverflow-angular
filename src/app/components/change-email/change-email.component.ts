import { HttpErrorResponse } from '@angular/common/http';
import { Component} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ChangeEmailService } from 'src/app/service/change-email.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent {

  constructor(private changeEmailServ: ChangeEmailService, private cookieServ: CookieService, private router: Router, private toastr: ToastrService) { }
  changeEmailForm = new FormGroup({
    newEmail: new FormControl(''),
  })

  errorMessage:string = ''

  changeEmail() {
    let username = sessionStorage.getItem('username');
    let newEmail = this.changeEmailForm.controls['newEmail'].value;

    this.errorMessage = ''
    this.changeEmailServ.sendEmailData(username, newEmail ).subscribe(
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
