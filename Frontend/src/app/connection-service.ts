import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';

const httpOptions : any    = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
  })
};

@Injectable({
  providedIn: 'root',
})
export class connectionService {
 readonly APIUrl="http://localhost:3000/api";
 
  constructor(private http:HttpClient) {}

  getServer() {
    return this.http.get(this.APIUrl, {responseType: 'text'});
  }
  
}