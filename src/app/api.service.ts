import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError} from 'rxjs/operators';

import { environment } from '../environments/environment'


@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private httpPostOptions = {
    headers:
      new HttpHeaders ({
        "Content-Type": "application/json"
      })
  };

  get(url, name): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(url).pipe(
        catchError(this.handleError(name, []))
      ).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error && error.error && error.error.message) {
        return throwError(error.error.message);
      } else {
        return throwError('Unknow error.');
      }
    };
  }

  public getPolicyImage(poolIndex, policyIndex) {
    return [
      '/assets/images/tmp/metamask.svg',
      '/assets/images/tmp/rainbow.png'
    ][policyIndex];
  }

  public queryGraph(command) {
    const url = "https://api.studio.thegraph.com/query/41024/tidal-v2/v0.0.1";
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify({query: command});

    return this.http.post<any[]>(url, body, this.httpPostOptions)
      .pipe(
        catchError(this.handleError('queryGraph', []))
      );
  }
}
