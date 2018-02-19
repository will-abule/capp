import { About } from './../../../models/about';
import { AboutService } from './../../../services/about.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  about         :    Observable<About>;
  showSpinner   =    true;
  
  constructor(private abt : AboutService) { 
    this.about = this.abt.getAbout()
  }

  ngOnInit() {
    this.about.subscribe((x) => {
      this.showSpinner = false;
    })
  }

}
