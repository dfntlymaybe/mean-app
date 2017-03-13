import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    constructor(public fb: FormBuilder, private auth: AuthService) {}

    doLogin() {
      // this.auth.login(this.loginForm.value);
    }

}
