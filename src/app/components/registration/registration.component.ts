import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersHttpService} from '../../services/users-http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  constructor( private httpUser: UsersHttpService) { }
  charsCount = 5;
  submitted = false;

  form: FormGroup;
  user = {
    name: '',
    email: '',
    password: '',
    telephone: ''
  };

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email], this.checkForEmail.bind(this)),
      password: new FormControl('', [Validators.required, this.checkPasswordLength.bind(this)]),
      telephone: new FormControl('', Validators.required)
    });
  }

  checkPasswordLength(control: FormControl) {
    if (control.value.length < this.charsCount) {
      return {
        lengthError: true
      };
    }
    return  null;
  }

  checkForEmail(control: FormControl, obj): Promise<any> {
    const self = this;
    return new  Promise((resolve, reject) => {
      setTimeout(() => {
        // const userExist = self.httpUser.getAll();
        self.httpUser.existByEmail(control.value).subscribe(userExist => {
          if (userExist) {
            resolve({
              emailIsUsed: true
            });
          } else {
            resolve(null);
          }
        });
      }, 500);
    });
  }


  createNewUser() {
    const data = {
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      phone: this.user.telephone,
      role: 'USER'
    };
    this.userRegistrated();
    this.httpUser.create(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });

  }

  userRegistrated() {
    this.submitted = true;
  }
}
