import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {
  }
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  // checkNotValid(control: FormControl) {
  //   if (this.authService.isNotValid === true) {
  //     return {
  //       passwordError: true
  //     };
  //   }
  //   return  null;
  // }

  login() {
    this.authService.validate(this.user.email, this.user.password)
      .then((response) => {
        this.authService.setUserInfo({'user': response['user']});
        this.router.navigate(['announcements']);
      });
  }
}
