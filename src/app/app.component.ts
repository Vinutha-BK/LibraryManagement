import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'pm-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    pageTitle: string = 'Anytime Library';

    constructor(private userSVC: UserService, private router: Router) {
    }
    logout() {
        this.router.navigate(['']);
        this.userSVC.logout();
    }
}
