import { $Post } from './../../../models/post';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  Posts         :   Observable<$Post[]>;
  p             :   number = 1;
  showSpinner   =   true;
  constructor(private post: PostService) {
    this.Posts = this.post.getPosts()
   }

  ngOnInit() {
    this.Posts.subscribe((x) => {
      this.showSpinner = false;
    })
  }

}
