import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare var Auth0Lock: any;

@Injectable()

export class AuthService {

  lock = new Auth0Lock('kBgNCNMitAa04BdrkjlmQr6zMj0O8sm6', 'dfntlymaybe.eu.auth0.com');
  constructor(private router: Router) {
      // We'll listen for an authentication event to be raised and if successful will log the user in.
      // this.lock.on("authenticated", (authResult) => {
      //       localStorage.setItem('id_token', authResult.idToken);
      //     });
      this.lock.on('authenticated', (authResult: any) => {
            localStorage.setItem('id_token', authResult.idToken);

            this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
              if (error) {
                console.log(error);
              }

              localStorage.setItem('profile', JSON.stringify(profile));
            });

            this.lock.hide();
          });
    }

    // This method will display the lock widget
    login() {
      this.lock.show();
    }

    // This method will log the use out
    logout() {
      // To log out, just remove the token and profile
      // from local storage
      localStorage.removeItem('profile');
      localStorage.removeItem('id_token');

      // Send the user back to the public deals page after logout
      this.router.navigateByUrl('');
    }

    // Finally, this method will check to see if the user is logged in. We'll be able to tell by checking to see if they have a token and whether that token is valid or not.
    loggedIn() {
      return tokenNotExpired();
    }



  // constructor(private http: Http) { }

  // register(form){
  //   return this.http.post('/api/register', form)
  //   .map(res => res.json())
  //   .subscribe(
  //     (data) => {
  //       console.log('kbop', data)
  //     },
  //     (err) =>  console.log("Error Register In:",err),
  //     () => { console.log("All Good With The Data")  }
  //   )
  // }

  // login(form){
  //   return this.http.post('/api/login', form)
  //   .map(res => res.json())
  //   .subscribe(
  //       (data) => {
  //         console.log('kbop', data)
  //       },
  //       (err) =>  console.log("Error Loging In:",err),
  //       () => { console.log("All Good With The Data")  }
  //     )
  // }

}
