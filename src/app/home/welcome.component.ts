import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../service/users';

@Component({
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {

    public pageTitle: string = 'Welcome';
    private user: User = new User();
    bookImg: string;
    constructor(private userSVC: UserService) {
    }
    ngOnInit() {

    }
}

