import { About } from './../../../models/about';
import { AboutService } from './../../../services/about.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  about  : Observable<About>;

  constructor(private abt : AboutService) { }

  ngOnInit() {
    this.about = this.abt.getAbout()
  }


}
