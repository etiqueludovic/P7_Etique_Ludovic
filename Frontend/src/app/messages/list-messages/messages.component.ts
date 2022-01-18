import { Component, Input, OnInit } from '@angular/core';
import { AuthMessage } from '../../services/message.service';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthUser } from '../../services/auth.service';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { timer } from 'rxjs';
import { NgIfContext } from '@angular/common';

let id = ''; 
console.log("Ici ce trouve le token avant log")
if (sessionStorage['token']){
    id = JSON.parse(sessionStorage['token']).userId
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
Posts:any=[];
username!: string;
authStatus!: boolean;
dataItem!: number;
messageId: string = '';
userId: string = id;
retrieveResonse: any;
base64Data: any;
retrievedImage: any;
index: any;
image=[];

  constructor(private login: AuthUser, private router: Router, private service: AuthMessage, private activateroute: ActivatedRoute, private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
   this.authStatus = this.login.auth;
   this.ListMessages();
  }

  onCreate() {
    if (this.authStatus == true) {
      this.router.navigate(['create-message'])
      }
    }

  ListMessages() {
    
    this.service.viewMessages().subscribe(data => {
      
      console.log(data)
      this.Posts=data;
      this.dataItem = this.Posts.id;
      this.ChargeImage();     
          })
        }


  ChargeImage() {
    for(let i = 0; i < this.Posts.length; i++) {
      this.http.get('http://localhost:3000/images/' + this.Posts[i].imageUrl, {responseType: 'blob'})
          .subscribe(
            res => {
              this.retrieveResonse = res;
              this.base64Data = URL.createObjectURL(this.retrieveResonse);
              this.retrievedImage = this.sanitizer.bypassSecurityTrustUrl(this.base64Data);
            })
          }
        }

  DeleteMessage() {
   this.activateroute.params.subscribe(data => {
     this.messageId = data['id'];
     console.log(this.userId)
   })
   if (this.messageId)
   this.service.deleteMessage(this.messageId).subscribe(data => {
     console.log("message supprimé numéro :"+this.messageId)
     console.log(data)
   })
  }
}

