import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ChangeFirstNameService {
   constructor(
    private http: HttpClient,
    private cookieServ: CookieService
  ) { }

  sendFirstNameData(username, newFirstName){
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: this.cookieServ.get('token'),
    });
    let options = { headers: httpHeaders };

    let payload = {
      username:username,
      newFirstName:newFirstName
    }

    return this.http.put(`${environment.apiURL}/changeFirstName`, payload, options)

  }
}
