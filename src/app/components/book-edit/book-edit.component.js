"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/observable/merge");
var Observable_1 = require("rxjs/Observable");
var book_service_1 = require("./book.service");
var number_validator_1 = require("../shared/number.validator");
var generic_validator_1 = require("../shared/generic-validator");
var BookEditComponent = (function () {
    function BookEditComponent(fb, route, router, bookService) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.bookService = bookService;
        this.pageTitle = 'Book Edit';
        // Use with the generic validation message class
        this.displayMessage = {};
        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            bookName: {
                required: 'Book name is required.',
                minlength: 'Book name must be at least three characters.',
                maxlength: 'Book name cannot exceed 50 characters.'
            },
            bookCode: {
                required: 'Book code is required.'
            },
            starRating: {
                range: 'Rate the book between 1 (lowest) and 5 (highest).'
            }
        };
        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new generic_validator_1.GenericValidator(this.validationMessages);
    }
    Object.defineProperty(BookEditComponent.prototype, "tags", {
        get: function () {
            return this.bookForm.get('tags');
        },
        enumerable: true,
        configurable: true
    });
    BookEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.bookForm = this.fb.group({
            bookName: ['', [forms_1.Validators.required,
                    forms_1.Validators.minLength(3),
                    forms_1.Validators.maxLength(50)]],
            bookCode: ['', forms_1.Validators.required],
            starRating: ['', number_validator_1.NumberValidators.range(1, 5)],
            tags: this.fb.array([]),
            description: ''
        });
        // Read the book Id from the route parameter
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id'];
            _this.getBook(id);
        });
    };
    BookEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    BookEditComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Watch for the blur event from any input element on the form.
        var controlBlurs = this.formInputElements
            .map(function (formControl) { return Observable_1.Observable.fromEvent(formControl.nativeElement, 'blur'); });
        // Merge the blur event observable with the valueChanges observable
        Observable_1.Observable.merge.apply(Observable_1.Observable, [this.bookForm.valueChanges].concat(controlBlurs)).debounceTime(800).subscribe(function (value) {
            _this.displayMessage = _this.genericValidator.processMessages(_this.bookForm);
        });
    };
    BookEditComponent.prototype.addTag = function () {
        this.tags.push(new forms_1.FormControl());
    };
    BookEditComponent.prototype.getBook = function (id) {
        var _this = this;
        this.bookService.getBook(id)
            .subscribe(function (book) { return _this.onBookRetrieved(book); }, function (error) { return _this.errorMessage = error; });
    };
    BookEditComponent.prototype.onBookRetrieved = function (book) {
        if (this.bookForm) {
            this.bookForm.reset();
        }
        this.book = book;
        if (this.book.id === 0) {
            this.pageTitle = 'Add Book';
        }
        else {
            this.pageTitle = "Edit Book: " + this.book.bookName;
        }
        // Update the data on the form
        this.bookForm.patchValue({
            bookName: this.book.bookName,
            bookCode: this.book.bookCode,
            starRating: this.book.starRating,
            description: this.book.description
        });
        this.bookForm.setControl('tags', this.fb.array(this.book.tags || []));
    };
    BookEditComponent.prototype.deleteBook = function () {
        var _this = this;
        if (this.book.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        }
        else {
            if (confirm("Really delete the book: " + this.book.bookName + "?")) {
                this.bookService.deleteBook(this.book.id)
                    .subscribe(function () { return _this.onSaveComplete(); }, function (error) { return _this.errorMessage = error; });
            }
        }
    };
    BookEditComponent.prototype.saveBook = function () {
        var _this = this;
        if (this.bookForm.dirty && this.bookForm.valid) {
            // Copy the form values over the book object values
            var p = Object.assign({}, this.book, this.bookForm.value);
            this.bookService.saveBook(p)
                .subscribe(function () { return _this.onSaveComplete(); }, function (error) { return _this.errorMessage = error; });
        }
        else if (!this.bookForm.dirty) {
            this.onSaveComplete();
        }
    };
    BookEditComponent.prototype.onSaveComplete = function () {
        // Reset the form to clear the flags
        this.bookForm.reset();
        this.router.navigate(['/books']);
    };
    return BookEditComponent;
}());
__decorate([
    core_1.ViewChildren(forms_1.FormControlName, { read: core_1.ElementRef }),
    __metadata("design:type", Array)
], BookEditComponent.prototype, "formInputElements", void 0);
BookEditComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/books/book-edit.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        router_1.ActivatedRoute,
        router_1.Router,
        book_service_1.BookService])
], BookEditComponent);
exports.BookEditComponent = BookEditComponent;
//# sourceMappingURL=book-edit.component.js.map