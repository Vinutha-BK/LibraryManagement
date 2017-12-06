import { Component, OnInit } from '@angular/core';

import { IBook } from '../../service/book';
import { BookService } from '../../service/book.service';
import { UserService } from '../../service/user.service';
import { RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';


@Component({
    templateUrl: './mybooks.component.html',
    styleUrls: ['./mybooks.component.css']
})
export class MybooksComponent implements OnInit {
    pageTitle: string = 'My Book List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string = "";
    userId: string;
    errorMessage: string;

    books: IBook[];

    constructor(private bookService: BookService, private userSVC: UserService, private router: Router) {

    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.userId = this.userSVC.loggedInUser;
        this.bookService.getBooks()
            .subscribe(books => this.books = books,
            error => this.errorMessage = <any>error);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'My book: ' + message;
    }

    returnBook(book) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        book.userId = "";
        book.userName = "";
        let now = new Date();
        book.issuedDateTime = "";
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

