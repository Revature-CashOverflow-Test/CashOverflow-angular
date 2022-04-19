import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient:HttpClient, private cookieServ: CookieService) { }

  saveEmailSettings(emailToggle: boolean, emailValue: number){
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', `${environment.apiURL}/changeEmailSettings`)
    .set('Authorization', `${this.cookieServ.get('token')}`);
    let options = { headers: headers };

    let emailSettings = {
      "emailToggle": emailToggle,
      "emailValue": emailValue
    }

    return this.httpClient.put(`${environment.apiURL}/changeEmailSettings`, emailSettings, options)
  }

  sendEmailBasic(email){
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', `${environment.apiURL}/sendemail`)
    .set('Authorization', `${this.cookieServ.get('token')}`);
    let options = { headers: headers };

    return this.httpClient.post(`${environment.apiURL}/sendemail`, email, options);
  }

  createEmailSubject(form) {

    return `Transfer of money to account ${form.transferToAccount}`

  }

  createEmailBody(form) {

    return `$${form.transferAmount} has just been transfered from bank account ${form.transferFromAccount} to the bank account ${form.transferToAccount}. \n\n Thank you for using CashOverflow.`

  }
}
