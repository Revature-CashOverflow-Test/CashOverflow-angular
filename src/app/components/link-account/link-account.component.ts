import { Component} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import { AddSocialService } from 'src/app/service/addSocial/add-social.service';

@Component({
  selector: 'app-link-account',
  templateUrl: './link-account.component.html',
  styleUrls: ['./link-account.component.css'],
})
export class LinkAccountComponent {
  constructor(
    private auth: AuthService,
    private socialServ: AddSocialService,
    private toastr: ToastrService
  ) {}
  data = {
    username: '',
    profileSub: '',
  }; //Used for logging in w/ auth0 purposes

  errorMessage: string = '';

  loginWithAuth() {

    let username = sessionStorage.getItem('username');
    console.log(username);

    this.auth.loginWithPopup({ prompt: 'login' });
    this.auth.user$.subscribe((profile) => {
      //Checks to make sure sub and nickname exists.
      //They can not exists, and without this will login users as a unknown user
      if (profile?.sub && profile?.nickname) {
        this.data = {
          username: profile?.nickname + profile?.sub, //This ensures all usernames are unique
          profileSub: profile?.sub,
        };
      }
      this.data.username = this.data.username.substring(0, 19); //A username can only be 20 characters long

      console.log(username);
      console.log(this.data.username);

      if (this.data.username != username) {
        console.log('Linking account');
        console.log(this.data);
        this.socialServ.setUserSocial(this.data).subscribe(
          (data) => {
            this.success();
            console.log(data);
          },
          (err) => {
            this.Error();
            console.log(err);
          }
        );
      }
    });
  }

  success(): void {
    this.toastr.success(
      'Login Success!',
      `You have been successfully linked this account`
    );
  }

  Error(): void {
    this.toastr.error(
      'Register Error',
      'Unable to link this account. Possible failure to communicate, try logging in with other account to verify failure. If failure, contact technical support'
    );
  }
}
