import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }        from './app.component';
import { AuthService }         from './auth.service';
import { AppRoutingModule }    from './app-routing.module';
import { DashboardComponent }  from './dashboard.component';
import { DataViewerComponent } from './data-viewer.component';
import { FacecapComponent }    from './facecap.component';
import { WebidLoginComponent } from './webid-login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DataViewerComponent,
    FacecapComponent,
    WebidLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
