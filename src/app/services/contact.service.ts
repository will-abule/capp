import { Contact, $Contact } from './../models/contact';
import { FirestoreService } from './firestore.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotifyService } from "./notify.service";

@Injectable()
export class ContactService {

  basePath  =   'contact';
  post      :    Observable<$Contact>

  constructor(
    private afs     : FirestoreService,
    private router  : Router,
    private notify  : NotifyService
  ) { }


    getContact(id: string) : Observable<$Contact> {
      this.post = this.afs.doc$(`${this.basePath}/${id}`)
      return this.post
    }

    getContacts() : Observable<$Contact[]> {
      return this.afs.colWithIds$(this.basePath, ref =>{
        return ref.orderBy('updatedAt', 'desc')
      })
    }

    deleteContact(product, id) {

      this.deleteFileData(id)
      .then( () => {
        this.deleteFileStorage(product.name);
      })
      .catch((error) => this.handleError(error));
    }



  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  saveContact(name:string, email:string, subject:string, phoneNumber:number, message:string) {
    const data      :   Contact = {
      name          :   name,
      email         :   email,
      subject       :   subject,
      phoneNumber   :   phoneNumber,
      message       :   message
    }
    this.saveFileData(data)
  }



  // Writes the file details to the realtime db Document
  private saveFileData(Contact: Contact) {

    const data      :     Contact = {
      name          :     Contact.name,
      email         :     Contact.email,
      phoneNumber   :     Contact.phoneNumber,
      subject       :     Contact.subject,
      message       :     Contact.message
    };

    console.log(data)
    this.notify.update('Message Sent', 'success')
    this.router.navigate(['/'])
    return this.afs.add(this.basePath,data)

  }
  
      // Writes the file details to the realtime db
      private deleteFileData(id) {
        this.notify.update('Deleted', 'danger')
        this.router.navigate(['/admin/products'])
        return this.afs.delete(`${this.basePath}/${id}`)
      }

      // Firebase files must have unique names in their respective storage dir
      // So the name serves as a unique key
      private deleteFileStorage(name: string) {
        const storageRef = firebase.storage().ref();
        storageRef.child(`${this.basePath}/${name}`).delete()
      }

        // If error, console log and notify user
        private handleError(error: Error) {
          console.error(error);
          this.notify.update(error.message, 'success')
        }

}
