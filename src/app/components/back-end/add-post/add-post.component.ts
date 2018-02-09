import { PostService } from './../../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Upload } from '../../../models/post';
import "froala-editor/js/froala_editor.pkgd.min.js";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  selectedFiles: FileList | null;
  Post: Upload;
  file;

  constructor(private router: Router, private post: PostService) { }

  ngOnInit() {
  }

  detectFiles($event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
  }

  save(p) {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.Post = new Upload(file.item(0));
      this.post.savePost(this.Post,p)
    } else {
      console.error('No file found!');
    }
  }

  cancel(){
    this.router.navigate(['/'])
  }
}