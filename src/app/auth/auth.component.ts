import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(private authService: AuthService, private cookieService: CookieService) {
  }

  onSubmit(f: NgForm) {
    this.authService.login(f.value.email, f.value.password).subscribe(res => {
        this.cookieService.set('email', res.email);
        this.authService.user.next({email: res.email});

        const expirationTime = new Date(new Date().getTime() + 2 * 60 * 1000); // 1 hour
        this.cookieService.set('token', res.idToken, expirationTime);
        this.cookieService.set('tokeExp', expirationTime.toISOString(), expirationTime);
        this.authService.setLogoutAuto();
      },
      (error) => {
        console.log(error);
      });
  }
}
