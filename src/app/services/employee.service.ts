import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../employee';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiURL = environment.apiURL;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.apiURL + '/employees/')
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  create(post: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.apiURL + '/employees/add', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
     
  find(id: string): Observable<any> {
    return this.httpClient.get(this.apiURL + '/employees/' + id)
    .pipe(catchError(this.errorHandler))
  }
     
  update(id: string, post: Employee): Observable<any> {
    return this.httpClient.patch(this.apiURL + '/employees/' + id, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  delete(id: string): Observable<any> {
    return this.httpClient.delete(this.apiURL + '/employees/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
