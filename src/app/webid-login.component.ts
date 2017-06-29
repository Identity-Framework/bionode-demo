import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'webid-loginform',
  templateUrl: './webid-login.component.html',
  styleUrls: [ './webid-login.component.css' ]
})
export class WebidLoginComponent implements OnInit {
  ngOnInit(): void { }

  constructor(private authService: AuthService) { }

  submitted: boolean = false;

  isValidWebid(): void {
    this.submitted = true;
    //this.authService.isValidWebid();
  }
}
