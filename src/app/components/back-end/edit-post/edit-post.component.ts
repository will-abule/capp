import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './../../../services/post.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  posts;
  id : string

  constructor(
    private p : PostService, 
    private route : ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
   }

  ngOnInit() {
    this.posts = this.p.getPost(this.id).take(1).subscribe(p => this.posts = p)
  }

  delete(p){
    this.p.deleteProduct(p,this.id)
  }

  cancel(){
    this.router.navigate(['/admin/post'])
  }

  save(p){
    this.p.updatePost(p,this.id)
  }

}
