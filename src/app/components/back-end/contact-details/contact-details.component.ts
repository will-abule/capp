import { ActivatedRoute } from '@angular/router';
import { ContactService } from './../../../services/contact.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { $Contact } from './../../../models/contact';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  Contact  :   Observable<$Contact>;

  constructor(
    private contact   :    ContactService,
    private route     :    ActivatedRoute
  ) { }

  ngOnInit() {
    this.Contact = this.route.params.switchMap(p => this.contact.getContact(p['id']))
    
  }

}
