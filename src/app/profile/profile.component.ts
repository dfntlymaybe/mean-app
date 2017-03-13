import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {};
  constructor() { }

  ngOnInit() {
    // console.log(this.user);
    debugger;
    this.user = JSON.parse(localStorage.getItem('profile'));
  }

}
