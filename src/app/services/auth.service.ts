import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public user: Observable<any>;
private userData = new BehaviorSubject(null);

  constructor(private storage: Storage, private http: HttpClient,
              private plt: Platform, private router: Router) {
                this.loadStoredToken();
               }

loadStoredToken() {
// tslint:disable-next-line:prefer-const
let platform0bs = from(this.plt.ready());

this.user = platform0bs.pipe(
    switchMap(() => {
    return from(this.storage.get(TOKEN_KEY));
}),
map(token => {
console.log('Token from storage: ', token);
if (token) {
// tslint:disable-next-line:prefer-const
let decoded = helper.decodeToken(token);
console.log('decoded: ', decoded);
this.userData.next(decoded);
} else {
return null;
}
})
);
}

login(credentials: {email: string, pw: string}) {
  if (credentials.email !== 'leo@sormunen.com' || credentials.pw !== '123') {
return of(null);
  }

  return this.http.get('https://randomuser.me/api/').pipe(
take(1),
map(res => {
// tslint:disable-next-line:max-line-length
return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1Njc2NjU3MDYsImV4cCI6MTU5OTIwMTcwNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiMTIzNDUiLCJmaXJzdF9uYW1lIjoiU2ltb24iLCJsYXN0X25hbWUiOiJHcmltbSIsImVtYWlsIjoic2FpbW9uQGRldmRhY3RpYy5jb20ifQ.4LZTaUxsX2oXpWN6nrSScFXeBNZVEyuPxcOkbbDVZ5U';
}),
switchMap(token => {
  // tslint:disable-next-line:prefer-const
  let decoded = helper.decodeToken(token);
  this.userData.next(decoded);

  // tslint:disable-next-line:prefer-const
  let storageObs = from(this.storage.set(TOKEN_KEY, token));
  return storageObs;
})
);
}

getUser() {
return this.userData.getValue();
}

logout() {
this.storage.remove(TOKEN_KEY).then(() => {
this.router.navigateByUrl('/');
this.userData.next(null);
});

}
}
