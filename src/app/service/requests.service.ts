import { UserTransfer } from './../model/user-transfer';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private getTransferUrl = `${environment.apiURL}/api/account/retrieveRequest`;
  private completeTransferUrl = `${environment.apiURL}/api/account/completeTransfer`;
  requests: UserTransfer[] = [];
  currentRequest: UserTransfer = {
    id: 0,
    sendOrReceive: 0,
    originUser: '',
    user: '',
    transferAccount: 0,
    transferAmount: 0,
    receiveAccount: 0
  };
  constructor(
    private myHttpClient: HttpClient,
    private cookieServ: CookieService
  ) {}

  getUserTransfer(): Observable<UserTransfer[]> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: this.cookieServ.get('token'),
    });
    // this.bankAccounts =
    return this.myHttpClient.get<UserTransfer[]>(this.getTransferUrl, {
      headers: httpHeaders,
    });
  }

  sendUserTransfer(info: UserTransfer, other: UserTransfer) {
    info.receiveAccount = other.receiveAccount;
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: this.cookieServ.get('token'),
    });
    let options = { headers: httpHeaders };

    return this.myHttpClient.post<HttpResponse<any>>(
      this.completeTransferUrl,
      info,
      options
    );
  }
}
