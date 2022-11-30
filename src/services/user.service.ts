import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
  }
  getUsers(): Observable<User[]> {
    const url = `${this.baseUrl}/users`;
    return this.http.get<User[]>(url);
  }
  getUsersByIds(ids: number[]): Observable<User[]> {
    const url = `${this.baseUrl}/users/${ids
      .map((id) => 'id=' + id)
      .join('&')}`;
    return this.http.get<User[]>(url);
  }
  getUser(id: number): Observable<User> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.get<User>(url);
  }
  deleteUser(id: number): Observable<void> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.delete<void>(url);
  }
}
