import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
// import { AngularFireModule } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { InterceptorService } from 'ng2-interceptors';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import * as firebase from 'firebase/app';


@Injectable()
export class UserService implements CanActivate {
    userLoggedIn: boolean = false;
    loggedInUser: string;
    loggedInUserName: string;
    authUser: any;
    admin: boolean;
    user: Observable<firebase.User>;
    socialLog;
    users: any[];
    constructor(private router: Router, public af: AngularFire, private _http: InterceptorService) {


    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url: string): boolean {
        if (this.userLoggedIn) { return true; }

        this.router.navigate(['login']);
        return false;
    }

    register(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
                alert(`${error.message} Please Try Again!`);
            });
    }

    verifyUser() {
        this.authUser = firebase.auth().currentUser;
        if (this.authUser) {

            alert(`Welcome ${this.authUser.email}`);
            this.loggedInUser = this.authUser.email;
            this.loggedInUserName = this.authUser.displayName;
            if (this.loggedInUser === "admin@anytimelibrary.com") {
                this.admin = true;
            }
            else {
                this.admin = false;
            }

            this.userLoggedIn = true;
            this.router.navigate(['/anytimelibrary']);
        }
    }

    login(loginEmail: string, loginPassword: string) {
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .catch(function (error) {
                alert(`${error.message} Unable to login. Try again!`);
            });
    }
    private commentsUrl = 'http://localhost:4200/anytimelibrary';

    getProfile(): Observable<any> {

        // ...using get request
        return this._http.get(this.commentsUrl)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));

    }

    socialLogin(loginProvider) {
        //    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        this.socialLog = true;
       // firebase.auth.
        var provider;
        if (loginProvider === 'google') {
            // new firebase.auth.GoogleAuthProvider()
            provider = AuthProviders.Google;
        }
        else if (loginProvider === 'facebook') {
            provider = AuthProviders.Facebook;
        }
        else if (loginProvider === 'twitter') {
            provider = AuthProviders.Twitter;
        }

        return this.af.auth.login({
            provider: provider,
            method: AuthMethods.Popup,
        });
    }

    // Logs out the current user
    logout() {
        if (!this.socialLog) {
            firebase.auth().signOut().then(function () {
                alert(`Logged Out!`);

            }, function (error) {
                alert(`${error.message} Unable to logout. Try again!`);
            });
            this.userLoggedIn = false;
            this.socialLog = false;
        }
        else {
            this.userLoggedIn = false;
            this.socialLog = false;
            return this.af.auth.logout();
        }
    }

    getAdminStatus() {
        return this.admin;
    }
    getLoginStatus() {
        return this.userLoggedIn;
    }
    updateUserList(data) {
        let userExist: boolean = false;
        for (let i = 0; i < this.users.length; i++) {
            if (data.auth.email === this.users[i].email) {
                userExist = true;
            }
        }
        if (!userExist) {
            this.users.push({ name: data.auth.displayName, email: data.auth.email, picture: data.auth.picture });
        }
    }
}