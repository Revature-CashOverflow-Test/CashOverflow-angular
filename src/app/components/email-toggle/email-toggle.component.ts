import { HttpErrorResponse } from '@angular/common/http';
import { EmailService } from './../../service/email/email.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-toggle',
  templateUrl: './email-toggle.component.html',
  styleUrls: ['./email-toggle.component.css']
})
export class EmailToggleComponent implements OnInit {

  public emailDisabled: boolean = true;
  errorMessage:string = ''

  changeEmailForm = new FormGroup({
    emailToggle: new FormControl(''),
    newAmount: new FormControl(''),
  })

  constructor(private emailService: EmailService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.changeEmailForm.controls['newAmount'].disable()
  }

  saveSettings(){
    let toggleEmail = (this.emailDisabled, this.changeEmailForm.controls['newAmount'].value)
    this.emailService.saveEmailToggle(toggleEmail).subscribe(
      (data) => {
        if(data){
          this.toastr.success('You have successfully changed your password. Please log back in with your new password.', `Password Changed!`);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error)
        this.errorMessage = 'Settings not applied try again later'
      }
    )
  }

  toggleEle(){
    this.emailDisabled = !this.emailDisabled
    if (this.emailDisabled === false){
    this.changeEmailForm.controls['newAmount'].enable()
    } else if (this.emailDisabled === true){
    this.changeEmailForm.controls['newAmount'].disable()
    }
  }
}
