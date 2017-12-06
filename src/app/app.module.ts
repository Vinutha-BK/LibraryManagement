import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { InterceptorService } from 'ng2-interceptors';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';


import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';

/* Feature Modules */
import { BookModule } from './book/book.module';
import { ServerURLInterceptor } from './service/interceptor';
import { AuthService } from './service/auth.service';


export const firebaseConfig = {
  apiKey: "AIzaSyDcuSmEi2U_-PchF1PnnGViXT0vWj0VuHs",
  authDomain: "anytimelibrary.firebaseapp.com",
  databaseURL: "https://anytimelibrary.firebaseio.com",
  projectId: "anytimelibrary",
  storageBucket: "anytimelibrary.appspot.com",
  messagingSenderId: "689834096270"
};

export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, serverURLInterceptor: ServerURLInterceptor) { // Add it here
  let service = new InterceptorService(xhrBackend, requestOptions);
  service.addInterceptor(serverURLInterceptor); // Add it here
  return service;
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot([
      { path: 'anytimelibrary', component: WelcomeComponent },
      { path: '', redirectTo: 'anytimelibrary', pathMatch: 'full' },
      { path: '**', redirectTo: 'anytimelibrary', pathMatch: 'full' }
    ]),
    BookModule

  ],
  declarations: [
    WelcomeComponent,
    AppComponent,

  ],
  providers: [
    AuthService,
    ServerURLInterceptor,
    {
      provide: InterceptorService,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions, ServerURLInterceptor]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
