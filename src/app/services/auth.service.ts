import { User } from './../models/users';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { FirestoreService } from './firestore.service';

@Injectable()

export class AuthService {

  user  : Observable<User | null>;
  data  : User

  constructor(
              private afAuth: AngularFireAuth,
              private afs: FirestoreService,
              private router: Router,
            ) {

    this.user = this.afAuth.authState
      .switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        alert('Welcome !')
        return this.updateUserData(credential.user);
      })
      .catch((error) => this.handleError(error) );
  }

   //// Email/Password Auth ////

   emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
          const userData: User = {
            uid: user.uid,
            email: user.email || null,
            displayName: user.displayName || user.email || 'Nameless User'
        }
        return this.updateUserData(userData); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        alert('Welcome...!!!')
        this.router.navigate(['/admin/dashboard']);
        // return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => alert('Password update email sent'))
      .catch((error) => this.handleError(error));
  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
      alert('Sign Out !')
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    alert(error.message);
  }

  // Sets user data to firestore after succesful login
  private updateUserData(userData) {

    this.data = {
      uid: userData.uid,
      email: userData.email || null,
      displayName: userData.displayName || userData.email || 'Nameless User',
  }
    this.router.navigate(['/admin/posts']);
    return this.afs.set(`users/${userData.uid}`,this.data);
  }
}