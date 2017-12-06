import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IBook } from '../../service/book';
import { BookService } from '../../service/book.service';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';
import { Api } from '../../service/api.service';
import { Http, Response } from '@angular/http';


@Component({
    templateUrl: './book-edit.component.html',
    providers: [Api]
})
export class BookEditComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle = 'Book Edit';
    errorMessage: string;
    bookForm: FormGroup;

    book: IBook;
    private sub: Subscription;
    pendingRequest: any;

    booksData: Array<Object> = [];
    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    get tags(): FormArray {
        return <FormArray>this.bookForm.get('tags');
    }

    constructor(private fb: FormBuilder,
        private api: Api,
        private route: ActivatedRoute,
        private router: Router,
        private bookService: BookService, private http: Http) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            bookTitle: {
                required: 'Book name is required.',
                minlength: 'Book name must be at least three characters.',
                maxlength: 'Book name cannot exceed 50 characters.'
            },
            isbn: {
                required: 'Book code is required.'
            },
            starRating: {
                range: 'Rate the book between 1 (lowest) and 5 (highest).'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.bookForm = this.fb.group({
            bookTitle: ['', [Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)]],
            isbn: ['', Validators.required],
            starRating: ['', NumberValidators.range(1, 5)],
            tags: this.fb.array([]),
            description: '',
            author: ''
        });

        // Read the book Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                const id = +params['id'];
                this.getBook(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.bookForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.bookForm);
        });
    }

    addTag(): void {
        this.tags.push(new FormControl());
    }

    getBook(id: number): void {
        this.bookService.getBook(id)
            .subscribe(
            (book: IBook) => this.onBookRetrieved(book),
            (error: any) => this.errorMessage = <any>error
            );
    }
    private extractData(book) {
        let booksData: IBook

        booksData.id = 1;
        booksData.author = book.volumeInfo.authors;
        booksData.bookTitle = book.volumeInfo.title;
        booksData.tags = book.volumeInfo.categories;
        booksData.description = book.volumeInfo.description;
        booksData.starRating = book.volumeInfo.averageRating;
        booksData.thumbnailImage = book.volumeInfo.imageLinks === undefined ? '' : book.volumeInfo.imageLinks.thumbnail;
        booksData.isbn = book.volumeInfo.industryIdentifiers;
        booksData.genre = book.volumeInfo.categories;
        booksData.renewDateTime = '';
        booksData.userId = '';
        booksData.userName = '';
        booksData.issuedDateTime = '';
        booksData.location = '';

        this.onBookRetrieved(booksData)

    }
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    getBookDetails(isbn) {
        this.pendingRequest = this.api.getData('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + '&key=AIzaSyDcuSmEi2U_-PchF1PnnGViXT0vWj0VuHs').
            // delay(500).
            subscribe(
            data => this.extractData(data),
            error => console.error('Error: ' + error)
            );
    }
    onBookRetrieved(book: IBook): void {
        if (this.bookForm) {
            this.bookForm.reset();
        }
        this.book = book;

        if (this.book.id === 0) {
            this.pageTitle = 'Add Book';
        } else {
            this.pageTitle = `Edit Book: ${this.book.bookTitle}`;
        }

        // Update the data on the form
        this.bookForm.patchValue({
            bookTitle: this.book.bookTitle,
            isbn: this.book.isbn,
            starRating: this.book.starRating,
            description: this.book.description,
            author: this.book.author
        });
        this.bookForm.setControl('tags', this.fb.array(this.book.tags || []));
    }

    deleteBook(): void {
        if (this.book.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the book: ${this.book.bookTitle}?`)) {
                this.bookService.deleteBook(this.book.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveBook(): void {
        if (this.bookForm.dirty && this.bookForm.valid) {
            // Copy the form values over the book object values
            const p = Object.assign({}, this.book, this.bookForm.value);
            this.bookService.saveBook(p)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.bookForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.bookForm.reset();
        this.router.navigate(['/books']);
    }
}



