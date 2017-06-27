import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }  from './dashboard.component';
import { DataViewerComponent } from './data-viewer.component';
import { FacecapComponent }    from './facecap.component';
import { WebidLoginComponent } from './webid-login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'dataviewer',
    component: DataViewerComponent,
  },
  {
    path: 'facecapture',
    component: FacecapComponent,
  },
  {
    path: 'login',
    component: WebidLoginComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
