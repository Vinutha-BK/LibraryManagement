import { Component, OnInit } from '@angular/core';

import { IBook } from '../../service/book';
import { BookService } from '../../service/book.service';
import { UserService } from '../../service/user.service';
import { Api } from '../../service/api.service';
import { Utils } from '../../uility/utils.service';
import { Router } from '@angular/router';
import { RequestOptions, Headers } from '@angular/http';

@Component({
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
    pageTitle: string = 'Book List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string = "";
    errorMessage: string;

    books: IBook[];
    pendingRequest;
    booksData: Array<Object> = [];

    constructor(private api: Api, private bookService: BookService, private userSVC: UserService, private router: Router) {


    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {

        this.bookService.getBooks()
            .subscribe(books => this.books = books,
            error => this.errorMessage = <any>error);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Book List: ' + message;
    }
    issueBook(book) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        book.userId = this.userSVC.loggedInUser;
        book.userName = this.userSVC.loggedInUserName;
        let now = new Date();
        book.issuedDateTime = now;
        book.renewDateTime = this.addDays(now, 15);

        this.bookService.updateBook(book, options)
            .subscribe(
            () => this.onSaveComplete(book),
            (error: any) => this.errorMessage = <any>error
            );
    }


    onSaveComplete(book): void {
        // Reset the form to clear the flags
        this.router.navigate(['/book', book.id]);
    }
    addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }


}
