import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { LoginComponent } from '../components/login/login.component';
import { SignUpComponent } from '../components/signUp/sign-up.component';

import { BookListComponent } from '../components/book-list/book-list.component';
import { BookEditComponent } from '../components/book-edit/book-edit.component';
import { BookFilterPipe } from '../uility/book-filter.pipe';
import { BookData } from '../data/book-data';
import { BookDetailGuard, BookEditGuard } from '../service/book-guard.service';
import { BookService } from '../service/book.service';
import { SharedModule } from '../shared/shared.module';
import { BookDetailComponent } from '../components/book-detail/book-detail.component';
import { UserService } from '../service/user.service';
import { MybooksComponent } from '../components/mybooks/mybooks.component';
import { Api } from '../service/api.service';



@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(BookData),
    RouterModule.forChild([
      { path: 'books', component: BookListComponent },
      { path: 'mybooks', component: MybooksComponent },

      {
        path: 'book/:id',
        canActivate: [BookDetailGuard],
        component: BookDetailComponent
      },
      {
        path: 'bookEdit/:id',
        canDeactivate: [BookEditGuard],
        component: BookEditComponent
      },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent }
      // { path: '', component: AdminMenuComponent, canActivate: [UserService] }
    ]),

  ],
  declarations: [
    BookListComponent,
    BookDetailComponent,
    BookEditComponent,
    BookFilterPipe,
    LoginComponent,
    SignUpComponent,
    MybooksComponent
  ],
  providers: [
    BookService,
    BookDetailGuard,
    BookEditGuard,
    UserService,
    Api
  ]
})
export class BookModule { }
