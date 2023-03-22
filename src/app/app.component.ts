import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  email: string | undefined = '';
  timer! : number;

  constructor(private authService: AuthService, private cookieService: CookieService
    , private router: Router) {
  }

  ngOnInit(): void {
    const email = this.cookieService.get('email');
    if (email) {
      this.authService.user.next({email})
    }

    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      this.email = user?.email;
    })
    this.authService.setLogoutAuto();
  }

}
