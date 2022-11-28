import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private readonly url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000';
  }
  getUsers(): Observable<User[]> {
    const url = `${this.url}/users`;
    return this.http.get<User[]>(url);
  }
  postUser(data: any) {
    return this.http.post<any>('http://localhost:3000/users/', data);
  }
  getUser(id: number): Observable<User> {
    const url = `${this.url}/users/${id}`;
    return this.http.get<User>(url);
  }
  putUser(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/users/' + id, data);
  }
  updateUser(payload: User, id: number): Observable<User> {
    const url = `${this.url}/users/${id}`;
    return this.http.patch<User>(url, payload, httpOptions);
  }
  deleteUser(id: number): Observable<void> {
    const url = `${this.url}/users/${id}`;
    return this.http.delete<void>(url);
  }
}
