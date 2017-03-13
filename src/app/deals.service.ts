import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Deal } from './deal';


@Injectable()
export class DealsService {
  private publicDealsUrl = 'http://localhost:3000/deals/public';
  constructor(private http: Http) { }

  // Implement a method to get the public deals
    getPublicDeals() {
      return this.http
        .get(this.publicDealsUrl)
        .toPromise()
        .then(response=>response.json() as Deal[])
        .catch(this.handleError);
    }

    // Implement a method to handle errors if any
      private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
      }
}
