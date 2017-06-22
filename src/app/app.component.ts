import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bionode Demo';
}

@Component({
    selector: 'webid-login',
    template: `
        <button (click)="onWebID-login" value="Login With WebID+Bio" />
        `
})
