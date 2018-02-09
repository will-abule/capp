import { ContactService } from './../../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  userForm: FormGroup;
  formErrors = {
    'name': '',
    'email': '',
    'phoneNumber': '',
    'subject': '',
    'message': ''
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email'
    },
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 6 characters long.',
      'maxlength': 'Name cannot be more than 20 characters long.',
    },
    'phoneNumber': {
      'required': 'Phone Number is required.',
      'minlength': 'Phone Number must be at least 11 characters long.',
      'maxlength': 'Phone Number cannot be more than 20 characters long.',
    },
    'subject': {
      'required': 'Subject is required.',
      'minlength': 'Subject must be at least 6 characters long.',
      'maxlength': 'Subject cannot be more than 20 characters long.',
    },
    'message': {
      'required': 'Message is required.',
      'minlength': 'Message must be at least 11 characters long.',
    },
    

  };

  constructor(private fb: FormBuilder, private ContactService: ContactService) { }

  ngOnInit(): void {
    this.buildForm();
  }
  send(): void {
    this.ContactService.saveContact(
      this.userForm.value['name'],
      this.userForm.value['email'], 
      this.userForm.value['subject'],
      this.userForm.value['phoneNumber'],
      this.userForm.value['message'],)
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      'name': ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]
      ],
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'phoneNumber': ['', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(20)
      ]
      ],
      'subject': ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]
      ],
      'message': ['', [
        Validators.required,
        Validators.minLength(11),
      ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
