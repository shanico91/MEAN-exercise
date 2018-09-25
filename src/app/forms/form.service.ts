import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IForm } from './form';
import { IField } from "./fieldModel";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private formUrl = 'http://localhost:3000/forms';
  private submissionUrl = 'http://localhost:3000/submissions';
  private newFormUrl = 'http://localhost:3000/newform';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getForms(): Observable<IForm[]> {
    return this.http.get<IForm[]>(this.formUrl).pipe(
      /*tap(data => console.log('All: ' + JSON.stringify(data))),*/
      catchError(this.handleError)
    );
  }

  getSubmissions(id: string): Observable<Object[]> {
    let currUrl = this.submissionUrl + '/' + id;
    return this.http.get<Object[]>(currUrl).pipe(
      /*tap(data => console.log('All: ' + JSON.stringify(data))),*/
      catchError(this.handleError)
    );
  }

  getFields(id: string): Observable<IField[]> {
    let currUrl = this.formUrl + '/' + id;
    return this.http.get<IField[]>(currUrl).pipe(
      /*tap(data => console.log('all fields: ' + JSON.stringify(data))),*/
      catchError(this.handleError)
    );
  }

  submitForm(id: string, form: Object): Observable<any> {
    let currUrl = this.formUrl + '/' + id;
    return this.http.post<Object>(currUrl, form, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  postForm(form: Object): Observable<any> {
    return this.http.post<Object>(this.newFormUrl, form, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
