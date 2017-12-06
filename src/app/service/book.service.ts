import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IBook } from './book';

@Injectable()
export class BookService {
    private baseUrl = 'app/books';

    constructor(private http: Http) { }


    getBooks(): Observable<IBook[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(data => console.log('getBooks: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getBook(id: number): Observable<IBook> {
        if (id === 0) {
            return Observable.of(this.initializeBook());
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getBook: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteBook(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteBook: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveBook(book: IBook): Observable<IBook> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (book.id === 0) {
            return this.createBook(book, options);
        }
        return this.updateBook(book, options);
    }

    private createBook(book: IBook, options: RequestOptions): Observable<IBook> {
        book.id = undefined;
        return this.http.post(this.baseUrl, book, options)
            .map(this.extractData)
            .do(data => console.log('createBook: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateBook(book: IBook, options: RequestOptions): Observable<IBook> {

        const url = `${this.baseUrl}/${book.id}`;
        return this.http.put(url, book, options)
            .map(() => book)
            .do(data => console.log('updateBook: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeBook(): IBook {
        // Return an initialized object
        return {
            id: 0,
            author: null,
            bookTitle: null,
            tags: [''],
            description: null,
            starRating: null,
            thumbnailImage: null,
            isbn: null,
            genre: [''],
            renewDateTime: null,
            userId: null,
            userName: null,
            issuedDateTime: null,
            location: null,
        };
    }
}
