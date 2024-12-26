import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private url = "https://gorest.co.in/public/v2/users"
  private token = "e0e0da1ac5ee8f970a80797a899d6ebf7a3536d6321f2df9f97dde40778cbd8c";

  constructor(private http: HttpClient) { }

  getUsers(page: number, perPage: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());
    return this.http
      .get<any[]>(this.url, { headers: this.getHeaders(), params })
      .pipe(catchError(this.handleError));
  }

  createUser(user: any): Observable<any> {
    return this.http
      .post<any>(this.url, user, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateUser(userId: number, user: any): Observable<any> {
    return this.http
      .put<any>(`${this.url}/${userId}`, user, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteUser(userId: number): Observable<any> {
    return this.http
      .delete<any>(`${this.url}/${userId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error) {
      errorMessage = error.error.message || errorMessage;
    }
    return throwError(() => new Error(errorMessage));
  }
}
