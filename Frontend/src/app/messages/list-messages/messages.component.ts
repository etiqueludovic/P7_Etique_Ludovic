import { Component, Input, OnInit } from '@angular/core';
import { AuthMessage } from '../../services/message.service';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthUser } from '../../services/auth.service';

let id = ''; 
console.log("Ici ce trouve le token avant log")
if (sessionStorage['token']){
    id = JSON.parse(sessionStorage['token']).id
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

  constructor(private login: AuthUser, private router: Router, private service: AuthMessage, private activateroute: ActivatedRoute) { }

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
      console.log(this.Posts+"<------")
    })
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

