import { UserGuard } from './gaurd/user.guard';
import { ContactService } from './services/contact.service';
import { AuthService } from './services/auth.service';
import { AboutService } from './services/about.service';
import { FirestoreService } from './services/firestore.service';
import { PostService } from './services/post.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, ActivatedRoute, Routes } from "@angular/router";
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

// third party

// import { Angular4PaystackModule } from 'angular4-paystack';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import "froala-editor/js/froala_editor.pkgd.min.js";
import { KeysPipe } from "./models/keys.pipe";
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AgmCoreModule } from '@agm/core';
import * as $ from 'jquery';
window["$"] = $;
window["jQuery"] = $;


// firebase

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

// firebase setup

import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;


import { AppComponent } from './app.component';
import { NavBarComponent } from './components/ui/nav-bar/nav-bar.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { PageNotFoundComponent } from './components/ui/page-not-found/page-not-found.component';
import { HomeComponent } from './components/front-end/home/home.component';
import { AboutComponent } from './components/front-end/about/about.component';
import { ContactUsComponent } from './components/front-end/contact-us/contact-us.component';
import { PostComponent } from './components/front-end/post/post.component';
import { PostDetailComponent } from './components/front-end/post-detail/post-detail.component';
import { AddPostComponent } from './components/back-end/add-post/add-post.component';
import { AdminPostComponent } from './components/back-end/admin-post/admin-post.component';
import { EditPostComponent } from './components/back-end/edit-post/edit-post.component';
import { AdminAboutComponent } from './components/back-end/admin-about/admin-about.component';
import { DashboardComponent } from './components/back-end/dashboard/dashboard.component';
import { SignInComponent } from './components/front-end/sign-in/sign-in.component';
import { SignUpComponent } from './components/front-end/sign-up/sign-up.component';
import { ContactDetailsComponent } from './components/back-end/contact-details/contact-details.component';
import { LoadingSpinnerComponent } from './components/ui/loading-spinner/loading-spinner.component';


// Routes setup
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'posts', component: PostComponent },

  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent , canActivate: [UserGuard]},

  { path: 'admin/dashboard', component: DashboardComponent , canActivate: [UserGuard]},
  { path: 'admin/add-post', component: AddPostComponent , canActivate: [UserGuard]},
  { path: 'admin/posts', component: AdminPostComponent , canActivate: [UserGuard]},
  { path: 'admin/edit-post/:id', component: EditPostComponent , canActivate: [UserGuard]},
  { path: 'admin/about', component: AdminAboutComponent , canActivate: [UserGuard]},

  { path: 'admin/contact-details/:id', component: ContactDetailsComponent , canActivate: [UserGuard]},
  { path: '**', component: PageNotFoundComponent , canActivate: [UserGuard]}
]


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    PageNotFoundComponent,
    HomeComponent,
    AboutComponent,
    ContactUsComponent,
    PostComponent,
    PostDetailComponent,
    AddPostComponent,
    AdminPostComponent,
    EditPostComponent,
    AdminAboutComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ContactDetailsComponent,
    KeysPipe,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDScukczzFdVfBUxlGEbxp7k3jhadyvzXs'
    }),
    AgmSnazzyInfoWindowModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    PostService,
    FirestoreService,
    AboutService,
    AuthService,
    ContactService,
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
