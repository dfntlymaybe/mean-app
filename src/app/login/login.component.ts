import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

    constructor(public fb: FormBuilder) {}

    doLogin(event) {
      console.log(event);
      console.log(this.loginForm.value.password);
    }

}
