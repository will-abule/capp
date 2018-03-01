import { Observable } from 'rxjs/Observable';
import { FirestoreService } from './firestore.service';
import { About } from './../models/about';
import { Injectable } from '@angular/core';
import { NotifyService } from "./notify.service";

@Injectable()
export class AboutService {

  basePath  :   'about'
  about     :   Observable<About>;

  constructor(private afs: FirestoreService, private notify  : NotifyService) { }

  getAbout()    : Observable<About>{
    this.about  = this.afs.doc$('about/about')
    return this.about
  }

  updateAbout(About : About){
    this.updateAboutData(About)
  }


  private updateAboutData(About : About){
    this.afs.update('about/about',About)
    this.notify.update('Updated', 'success')
  }
}
