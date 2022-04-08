import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  constructor(private http: HttpClient) {}

  sendPasswordData(username, newPassword){

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', `${environment.apiURL}/changePassword`);

    let options = { headers: headers };

    let payload = {
      username:username,
      newPassword:newPassword
    }
    return this.http.put<any>(`${environment.apiURL}/changePassword`, payload, options)

  }
}
