import { Injectable } from '@angular/core';
import { bovino } from './bovino';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class bovinoService {
    private bovinosUrl = '/api/bovinos';

    constructor (private http: Http) {}

    // get("/api/bovinos")
    getbovinos(): Promise<bovino[]> {
      return this.http.get(this.bovinosUrl)
                 .toPromise()
                 .then(response => response.json() as bovino[])
                 .catch(this.handleError);
    }

    // post("/api/bovinos")
    createbovino(newbovino: bovino): Promise<bovino> {
      return this.http.post(this.bovinosUrl, newbovino)
                 .toPromise()
                 .then(response => response.json() as bovino)
                 .catch(this.handleError);
    }

    // get("/api/bovinos/:id") endpoint not used by Angular app

    // delete("/api/bovinos/:id")
    deletebovino(delbovinoId: String): Promise<String> {
      return this.http.delete(this.bovinosUrl + '/' + delbovinoId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/bovinos/:id")
    updatebovino(putbovino: bovino): Promise<bovino> {
      var putUrl = this.bovinosUrl + '/' + putbovino._id;
      return this.http.put(putUrl, putbovino)
                 .toPromise()
                 .then(response => response.json() as bovino)
                 .catch(this.handleError);
    }

    private handleError (error: any): Promise<any> {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console
      return Promise.reject(errMsg);
    }
}