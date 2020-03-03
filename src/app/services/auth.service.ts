import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  isNotValid = false;

  // tslint:disable-next-line:ban-types
  user: {};

  // tslint:disable-next-line:ban-types
  public isAuthenticated(): Boolean {
    const userData = this.getUserInfo();
    if (userData) {
      const parse = JSON.parse(userData);
      if (parse) {
        this.user = parse;
        return true;
      }
    }
    return false;
  }

  public getUserInfo() {
    return localStorage.getItem('userInfo');
  }

  public setUserInfo(user) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public removeUserInfo() {
    localStorage.removeItem('userInfo');
  }

  public validate(email, password) {
    const user = {
      email: email,
      password: password
    };
    return this.http.post('/api/authenticate', user).toPromise();
  }

  public logout() {
    console.log("Logout");
    return this.http.get('/api/logout').toPromise().then(() => {
      console.log("Delete");
      this.removeUserInfo();
    });
  }
}
