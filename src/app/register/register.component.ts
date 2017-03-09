import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm = this.fb.group({
        username: ["", Validators.required],
        password: ["", Validators.required],
        email: ["", Validators.required]
      });

      constructor(public fb: FormBuilder, private http: Http) {}

      doRegister(event) {

        console.log(this.registerForm.value);

        return this.http.post('api/register', this.registerForm.value)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }
}
