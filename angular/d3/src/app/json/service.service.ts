import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  getJSONData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  loadJSONData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
