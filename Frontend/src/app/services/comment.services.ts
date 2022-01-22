import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Comment } from "../models/Comment.models";

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
export class CommentService {
    
    readonly APIUrl="http://localhost:3000/api";
    constructor(private http:HttpClient) {}
    

      getComment() {
        return this.http.get(this.APIUrl+'/Comment', httpOptions)
      }

      addComment(comment: Comment) {
        return this.http.post(this.APIUrl+'/Comment/addcomment', comment, httpOptions)
      }

      deleteComment(idcom: Number) {
        return this.http.delete(this.APIUrl+'/Comment/delete/'+idcom, httpOptions)
      }

}