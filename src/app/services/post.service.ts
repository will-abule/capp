import { Upload, Post, $Post } from './../models/post';
import { FirestoreService } from './firestore.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Injectable()
export class PostService {

  basePath  =   'post';
  post      :    Observable<$Post>

  constructor(
    private afs: FirestoreService,
    private router: Router,
  ) { }


    getPost(id: string) : Observable<$Post> {
      this.post = this.afs.doc$(`${this.basePath}/${id}`)
      return this.post
    }

    getPosts() : Observable<$Post[]> {
      return this.afs.colWithIds$(this.basePath, ref =>{
        return ref.orderBy('updatedAt', 'desc')
      })
    }

    deleteProduct(product, id) {

      this.deleteFileData(id)
      .then( () => {
        this.deleteFileStorage(product.name);
      })
      .catch((error) => this.handleError(error));
    }



  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  savePost(Post: Upload, p) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${Post.file.name}`).put(Post.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
        // upload in progress
        const snap = snapshot;
        Post.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        // upload failed
        // console.log(error);
        this.handleError(error);
      },
      () => {
        // upload success
        if (uploadTask.snapshot.downloadURL) {
            Post.title    =   p.title
            Post.body     =   p.body
            Post.summary  =   p.summary
            Post.author   =   p.author
            Post.url      =   uploadTask.snapshot.downloadURL
            Post.name     =   Post.file.name
            this.saveFileData(Post)
          return;
        } else {
          console.error('No download URL!');
        }
      },
    );
  }


  // Executes the file uploading to firebase
  updatePost(Product, id) {
    this.updateFileData(Product, id)
  }

  // Writes the file details to the realtime db Document
  private saveFileData(Post: Post) {

    const data: Post = {
      name      :   Post.name,
      title     :   Post.title,
      body      :   Post.body,
      author    :   Post.author,
      summary   :   Post.summary,
      url       :   Post.url,
    };

    console.log(data)
    alert('Posted !')
    this.router.navigate(['/admin/posts'])
    return this.afs.add(this.basePath,data)

  }
  


    // Writes the file details to the realtime db Document
    private updateFileData(Post: Post, id) {
  
        const data: Post = {
          name      :   Post.name,
          title     :   Post.title,
          body      :   Post.body,
          author    :   Post.author,
          summary   :   Post.summary,
          url       :   Post.url,
        };
        
          alert('updated !')
          this.router.navigate(['/admin/post'])
          return this.afs.update(`${this.basePath}/${id}`,data)
    }


      // Writes the file details to the realtime db
      private deleteFileData(id) {
        alert('deleted !')
        this.router.navigate(['/admin/post'])
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
          alert(error.message)
        }

}
