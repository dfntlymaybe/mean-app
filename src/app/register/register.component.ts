import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

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

      constructor(public fb: FormBuilder, private auth: AuthService) {}

      doRegister() {
        // this.auth.register(this.registerForm.value);
      }
}
