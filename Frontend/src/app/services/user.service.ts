import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/User.model";

let token = ''; 
if (sessionStorage['token']){
    token = JSON.parse(sessionStorage['token']).token
}

const httpOptions : any    = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token,
      responseType: 'text'

    })
  };


@Injectable()
export class UserService {
    
    readonly APIUrl="http://localhost:3000/api";
    constructor(private http:HttpClient) {}
    

      getUserList() {
        return this.http.get(this.APIUrl+'/users/list')
      }
    
      addUser(user: User){
        return this.http.post(this.APIUrl+'/auth/register', user);
      }
      Login(user: User){
        return this.http.post(this.APIUrl+'/auth/login', user);
      }
      
      updateUser(user: {username: string, email: string, bio?: string}){
        return this.http.put(this.APIUrl+'/users/'+JSON.parse(sessionStorage['token']).id, user, httpOptions);
      }
    
      deleteUser(user: User){
        return this.http.delete(this.APIUrl+'/users/delete/'+JSON.parse(sessionStorage['token']).id, httpOptions);
      }

      getprofil(id: string) {
        return this.http.get(this.APIUrl+'/auth/profile/'+JSON.parse(sessionStorage['token']).id, httpOptions)
      }
}