import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../service/users';
import { AuthService } from '../../service/auth.service';
import * as firebase from 'firebase/app';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password1: string;
  private user: User = new User();
  constructor(private userSVC: UserService, private router: Router, public authService: AuthService) { }
  private authServerBaseUrl = 'http://localhost:4200';
  private config = {
    "loginRoute": "login",
    "linkedin": {
      "authEndpoint": this.authServerBaseUrl + "/auth/linkedin",
      "clientId": "130242074198628",
      "redirectURI": this.authServerBaseUrl + "/anytimelibrary"
    },
    "facebook": {
      "authEndpoint": this.authServerBaseUrl + "/auth/facebook",
      "clientId": "130242074198628",
      "redirectURI": this.authServerBaseUrl + "/anytimelibrary"
    },
    "google": {
      "authEndpoint": this.authServerBaseUrl + "/auth/google",
      "clientId": "689834096270-8a9pmgq7bpkot15rka0k5unpp4d7sfub.apps.googleusercontent.com",
      "redirectURI": this.authServerBaseUrl + "/anytimelibrary"
    }
  };

  socialLogin(loginProvider) {
    this.userSVC.socialLogin(loginProvider)
      .then((data) => {
        // this.userSVC.getProfile().subscribe(
        //   profile => {
        //     console.log(profile);
        //     console.log("socialLogin",this.user = new User(profile._id, profile.displayName, profile.email, profile.picture, profile.provider, profile.provider_id));
        //     //this.

        //   },
        //   err => {
        //     console.log(err);
        //   });
        this.userSVC.verifyUser();
      });
  }

  login() {
    this.userSVC.login(this.email, this.password1);
    this.userSVC.verifyUser();
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  cancel() {
    this.router.navigate(['']);
  }

  linkedinLogin() {
    this.authService.auth('linkedin', this.config);
  }
  facebookLogin() {
    this.authService.auth('facebook', this.config);
  }
  googleLogin() {
    this.authService.auth('google', this.config);
  }
}