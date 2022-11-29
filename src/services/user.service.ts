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
    const url = `${this.baseUrl}/users?${ids
      .map((id) => 'id=' + id)
      .join('&')}`;
    return this.http.get<User[]>(url);
  }
  // [1,2,3] trebuie sa ajungem aici pt a vedea superputerile filtrate de pe server
  postUser(data: any) {
    return this.http.post<any>('http://localhost:3000/users/', data);
  }
  putUser(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/users/' + id, data);
  }
  updateUser(payload: Partial<User>, userId: number): Observable<User> {
    const url = `${this.baseUrl}/users/${userId}`;

    return this.http.patch<User>(url, payload, httpOptions);
  }
  getUser(id: number): Observable<User> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.get<User>(url);
  }

  deleteUser(id: number): Observable<void> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.delete<void>(url);
  }
  addUser(user: User): Observable<User> {
    const url = `${this.baseUrl}/users`;
    return this.http.post<User>(url, user, httpOptions);
  }
}
