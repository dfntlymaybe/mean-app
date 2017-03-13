import { Component } from '@angular/core';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  currentUser = {
    username: null,
    email: null
  }

  constructor(private authService: AuthService) {}
  // isLoggedIn = false;
}
