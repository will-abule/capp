import { About } from './../../../models/about';
import { AboutService } from './../../../services/about.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PostService } from '../../../services/post.service';
import { $Post } from './../../../models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  about         :   Observable<About>;
  Posts         :   Observable<$Post[]>;
  p             :   number = 1;
  showSpinner   =    true;

  constructor(
    private abt : AboutService,
    private post: PostService
  ) {
    this.about = this.abt.getAbout()
    this.Posts = this.post.getPosts()
   }

  ngOnInit() {
    this.Posts.subscribe((x) => {
      this.showSpinner = false;
    })
  }

}
