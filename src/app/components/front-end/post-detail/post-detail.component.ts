import { ActivatedRoute } from '@angular/router';
import { PostService } from './../../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { $Post } from '../../../models/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  Post  :   Observable<$Post>

  constructor(
    private post  : PostService,
    private route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.Post = this.route.params.switchMap(p => this.post.getPost(p['id']))
    
  }

}
