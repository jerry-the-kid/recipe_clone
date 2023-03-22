import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

interface IFirebaseRes {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered: boolean,
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private API_KEY = 'AIzaSyBddO8oljbCZgM9UqehrujJUcitBGJb6D8';
  private API_LINK = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  user = new BehaviorSubject<{ email: string } | null>(null);
  timer! : number;

  constructor(private http: HttpClient, private cookieService : CookieService,
              private router : Router) {
  }

  login(email: string, password: string) {
    return this.http.post<IFirebaseRes>(this.API_LINK + this.API_KEY, {
      email,
      password,
      returnSecureToken: true
    });
  }

  private resetAuth(){
    this.user.next(null);
    this.cookieService.deleteAll();
    this.router.navigate(['auth']);
    clearTimeout(this.timer);
  }

  setLogoutAuto() {
    const jwtToken = this.cookieService.get('token');
    const jwtTokenExpiration = this.cookieService.get('tokeExp');

    if (jwtToken && jwtTokenExpiration) {
      const expirationTime = new Date(jwtTokenExpiration);
      this.timer = setInterval(() => {
        if (new Date() > expirationTime) {
          this.resetAuth();
        }
      }, 1000);
    } else {
      this.resetAuth();
    }
  }

}
