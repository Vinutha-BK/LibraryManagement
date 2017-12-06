import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { IBook } from '../../service/book';
import { BookService } from '../../service/book.service';
import { UserService } from '../../service/user.service';



@Component({
    templateUrl: './book-detail.component.html'
})
export class BookDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Book Detail';
    book: IBook;
    errorMessage: string;
    private sub: Subscription;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private bookService: BookService,
        private userSVC: UserService) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                const id = +params['id'];
                this.getBook(id);
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getBook(id: number) {
        this.bookService.getBook(id).subscribe(
            book => this.book = book,
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this.router.navigate(['/books']);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Book Detail: ' + message;
    }
}
