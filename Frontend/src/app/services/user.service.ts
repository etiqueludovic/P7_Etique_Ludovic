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
      'Authorization': 'Bearer ' + token,
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
    
      addUser(user: User) {
        return this.http.post(this.APIUrl+'/users/register', user);
      }

      Login(user: User){
        return this.http.post(this.APIUrl+'/users/login', user);
      }
      
      updateEmail(email: {email: string}){
        return this.http.put(this.APIUrl+'/users/'+JSON.parse(sessionStorage['token']).userId, email, httpOptions);
      }

      updateBio(bio: {bio: string}){
        return this.http.put(this.APIUrl+'/users/'+JSON.parse(sessionStorage['token']).userId+'/bio', bio, httpOptions);
      }

      updatePass(password: {password: string}){
        return this.http.put(this.APIUrl+'/users/'+JSON.parse(sessionStorage['token']).userId+'/password', password, httpOptions);
      }

      updateUsername(username: {username: string, userId: string}){
        return this.http.put(this.APIUrl+'/users/'+JSON.parse(sessionStorage['token']).userId+'/username', username, httpOptions);
      }

      updateProfil_image(profil_image: {profil_image: string}){
        return this.http.put(this.APIUrl+'/users/'+JSON.parse(sessionStorage['token']).userId+'/profil_image', profil_image, httpOptions);
      }
    
      deleteUser(userId: any){
        return this.http.delete(this.APIUrl+'/users/delete/'+userId, httpOptions);
      }

      getprofil(userId: any) {
        return this.http.get(this.APIUrl+'/users/profil/'+JSON.parse(sessionStorage['token']).userId)
      }

      getOneprofil(userId: any) {
        return this.http.get(this.APIUrl+'/users/profil/'+userId)
      }
}