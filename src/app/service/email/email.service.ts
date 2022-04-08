import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient:HttpClient, private cookieServ: CookieService) { }

  sendEmailBasic(email){
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', `${environment.apiURL}/sendemail`)
    .set('Authorization', `${this.cookieServ.get('token')}`);
    let options = { headers: headers };

    console.log("inside emailServices");
    console.log(email);

    this.httpClient.post(`${environment.apiURL}/sendemail`, email, options).subscribe(resp => console.log("request was sent successfullly"), error => console.log("request fail"))
  }

  createEmailSubject(form){

    return `Transfer of mooney to account ${form.transferToAccount}`

  }

  createEmailBody(form){

    return `The ammount ${form.transferAmount} has been transfered from account number ${form.transferFromAccount} to the account number ${form.transferToAccount} \n\n Thank you For using CashOverflow.`

  }
}
