import { $Post } from './../../../models/post';
import { PostService } from './../../../services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.css']
})
export class AdminPostComponent implements OnInit, OnDestroy {

  Post            :   $Post[]
  filteredPost    :   $Post[]
  sub             :   Subscription

  constructor(private post: PostService) { }

  ngOnInit() {
    this.sub = this.post.getPosts().subscribe(p => this.Post = this.filteredPost = p)
  }

  filter(query:string ) {
    this.filteredPost = (query) ?
     this.Post.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
     this.Post
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}

