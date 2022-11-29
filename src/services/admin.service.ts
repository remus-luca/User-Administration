import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from 'src/interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000';
  }
  getAdmins(): Observable<Admin[]> {
    const url = `${this.url}/admins`;
    return this.http.get<Admin[]>(url);
  }
  postAdmin(data: any) {
    return this.http.post<any>('http://localhost:3000/admins/', data);
  }
  getAdmin(id: number): Observable<Admin> {
    const url = `${this.url}/admins/${id}`;
    return this.http.get<Admin>(url);
  }
  putAdmin(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/admins/' + id, data);
  }
  updatedAdminUsersIds(payload: Partial<Admin>, id: number): Observable<Admin> {
    const url = `${this.url}/admins/${id}`;
    return this.http.patch<Admin>(url, payload, httpOptions);
  }
  deleteAdmin(id: number): Observable<void> {
    const url = `${this.url}/admins/${id}`;
    return this.http.delete<void>(url);
  }
}
