import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Social } from 'src/app/model/social';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddSocialService {
  private setSocialUrl = `${environment.apiURL}/api/account/addSocial`;
  constructor(
    private myHttpClient: HttpClient,
    private cookieServ: CookieService
  ) {}
  /**
   * This method access the endpoint in the server and sends a
   * bankAccount object so that it can be saved in the satabase.
   *
   * @param socialAccount - Social object w/ all parameters of BankAccount.
   * @returns Observable<Social>
   */
  setUserSocial(socialAccount: object): Observable<Social> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: this.cookieServ.get('token'),
    });

    console.log('Adding social of ');
    console.log(socialAccount);
    console.log('To');
    console.log(this.cookieServ.get('token'));

    return this.myHttpClient.post<Social>(
      this.setSocialUrl,
      JSON.stringify(socialAccount),
      { headers: httpHeaders }
    );
  }
}
