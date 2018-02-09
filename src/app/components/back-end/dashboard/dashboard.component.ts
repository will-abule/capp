import { ContactService } from './../../../services/contact.service';
import { $Contact } from './../../../models/contact';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit , OnDestroy {

  contact            :   $Contact[]
  filteredContact    :   $Contact[]
  sub             :   Subscription

  constructor(private Contact: ContactService) { }

  ngOnInit() {
    this.sub = this.Contact.getContacts().subscribe(p => this.contact = this.filteredContact = p)
  }

  filter(query:string ) {
    this.filteredContact = (query) ?
     this.contact.filter(p => p.name.toLowerCase().includes(query.toLowerCase())):
     this.contact
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}

