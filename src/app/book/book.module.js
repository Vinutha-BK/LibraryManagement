"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
// Imports for loading & configuring the in-memory web api
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var book_data_1 = require("./book-data");
var book_list_component_1 = require("./book-list.component");
var book_detail_component_1 = require("./book-detail.component");
var book_guard_service_1 = require("./book-guard.service");
var book_edit_component_1 = require("./book-edit.component");
var book_filter_pipe_1 = require("./book-filter.pipe");
var book_service_1 = require("./book.service");
var shared_module_1 = require("../shared/shared.module");
var BookModule = (function () {
    function BookModule() {
    }
    return BookModule;
}());
BookModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            forms_1.ReactiveFormsModule,
            angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(book_data_1.BookData),
            router_1.RouterModule.forChild([
                { path: 'books', component: book_list_component_1.BookListComponent },
                { path: 'book/:id',
                    canActivate: [book_guard_service_1.BookDetailGuard],
                    component: book_detail_component_1.BookDetailComponent
                },
                { path: 'bookEdit/:id',
                    canDeactivate: [book_guard_service_1.BookEditGuard],
                    component: book_edit_component_1.BookEditComponent },
            ])
        ],
        declarations: [
            book_list_component_1.BookListComponent,
            book_detail_component_1.BookDetailComponent,
            book_edit_component_1.BookEditComponent,
            book_filter_pipe_1.BookFilterPipe
        ],
        providers: [
            book_service_1.BookService,
            book_guard_service_1.BookDetailGuard,
            book_guard_service_1.BookEditGuard
        ]
    })
], BookModule);
exports.BookModule = BookModule;
//# sourceMappingURL=book.module.js.map