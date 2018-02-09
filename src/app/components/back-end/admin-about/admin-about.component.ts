import { AboutService } from './../../../services/about.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.css']
})
export class AdminAboutComponent implements OnInit {

  about;

  constructor(private abt : AboutService) { }

  ngOnInit() {
    this.about = this.abt.getAbout();
    this.about = this.abt.getAbout().take(1).subscribe(p => this.about = p )
  }

  save(about){
    this.abt.updateAbout(about)
  }

}
