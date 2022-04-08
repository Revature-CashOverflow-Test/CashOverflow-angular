import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  /**
   * Added headers to cope with CORS errors
   * @author Cameron, Amir, Chandra
   */
  sendRegisterData(registerForm) {

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', `${environment.apiURL}/register`);
     let options = { headers: headers };

    return this.http.post(`${environment.apiURL}/register`, registerForm, options)

  }
}
