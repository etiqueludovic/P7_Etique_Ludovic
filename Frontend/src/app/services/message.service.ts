import { Subject } from 'rxjs';
import { Message } from '../models/Message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

let token = ''; 
if (sessionStorage['token']){
    token = JSON.parse(sessionStorage['token']).token
}

const httpOptions : any  = {
    headers: new HttpHeaders({
        'responseType': 'text',
        'Authorization' : token
    })
  };



@Injectable()
export class AuthMessage {

    readonly APIUrl="http://localhost:3000/api";
    constructor(private http:HttpClient) {}

    addMessage(message: Message) {
        return this.http.post(this.APIUrl+'/messages/addmessage', message, httpOptions)
    }

    viewMessages() {
        return this.http.get(this.APIUrl+'/messages')
    }

    ViewOneMessage(id: string) {
        return this.http.get(this.APIUrl+'/messages/'+id, httpOptions)
    }

    deleteMessage(id: string) {
        return this.http.delete(this.APIUrl+'/messages/delete/'+id, httpOptions)
    }

    updateMessage(id: string, message: Message) {
        return this.http.put(this.APIUrl+'/messages/update/'+id, message, httpOptions)
    }

  public messages: string[] = [];

  public add(message: string): void {
    this.messages.push(message);
  }

  public clear(): void {
    this.messages = [];
  }

}
