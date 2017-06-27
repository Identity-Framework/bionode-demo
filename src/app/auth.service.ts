import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  // Make a request to the authorization end point
  // which will request the user's cert.
  // return: A Promise which resolves to the response of the
  //  authentication api.
  isValidWebid(): void { 
    this.http.get('https://localhost:3001/auth')
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
