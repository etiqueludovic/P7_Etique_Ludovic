import { Component, Input, OnInit } from '@angular/core';
import { AuthMessage } from '../../services/message.service';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthUser } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { CommentService } from 'src/app/services/comment.services';
import { NgForm } from '@angular/forms';

let id = ''; 
let token = '';
let username = '';
let IsAdmin = 0;
if (sessionStorage['token']){
    id = JSON.parse(sessionStorage['token']).userId,
    token = JSON.parse(sessionStorage['token']).token,
    username = JSON.parse(sessionStorage['token']).username,
    IsAdmin = JSON.parse(sessionStorage['token']).IsAdmin
}

const httpOptions : any    = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      responseType: 'text'

    })
  };

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
Posts:any=[];
UserList: any=[];
username: string = username;
authStatus!: boolean;
dataItem!: number;
messageId: string = '';
userId: string = id;
retrieveResonse: any;
base64Data: any;
retrievedImage: any;
index: any;
image=[];
retrieveResponse: any;
base64DataProfil: any;
retrievedImageprofil: any;
@Input() contents!: String;
Datecreat!: number;
Comment: any=[];
commentafficher!: boolean;
check!: Boolean;
utilisateurId: any = id;
isAdmin: number = IsAdmin;
dateCreat!: any;

  constructor(
    private login: AuthUser, 
    private router: Router, 
    private service: AuthMessage, 
    private activateroute: ActivatedRoute, 
    private http: HttpClient, 
    private sanitizer: DomSanitizer,
    private commentservice: CommentService
    ) { }

  ngOnInit() {
    this.authStatus = this.login.auth;
    if (id) {
    this.ListMessages();
    }

    this.commentafficher = false;

  }
  

  onCreate() {
    if (this.authStatus == true) {
      this.router.navigate(['create-message'])
      }
    }

  ListMessages() {
    this.service.viewMessages().subscribe(data => {
      this.Posts=data;
      this.getImage();  
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
              this.Posts[i].retrievedImage = this.sanitizer.bypassSecurityTrustUrl(this.base64Data); 
          })
        }
      }

  DeleteMessage() {
   this.activateroute.params.subscribe(data => {
     this.messageId = data['id'];
   })
   if (this.messageId)
   this.service.deleteMessage(this.messageId).subscribe(() => {
     location.reload();
   })
  }

  getImage() {
    for(let j = 0; j < this.Posts.length; j++) {
    this.http.get(this.Posts[j].profil_image, {responseType: 'blob'})
      .subscribe(
        res => {
          this.retrieveResponse = res;
          this.base64DataProfil = URL.createObjectURL(this.retrieveResponse);
          this.Posts[j].retrievedImageprofil = this.sanitizer.bypassSecurityTrustUrl(this.base64DataProfil);
        })
      }
    }

    addcomment(form: NgForm, postid: number) {    
      this.service.viewMessages().subscribe(data_m =>{
      this.Posts = data_m
      console.log(form.value)
      const comment = {
          'post_id': postid,
          'user_name': this.username,
          'user_id': this.utilisateurId,
          'content': form.value.comment,
      }
      this.commentservice.addComment(comment)
      .subscribe(() => {
          console.log("commentaire créé !")
          location.reload();
      })
    })
}

commentMasquer() {
  for(let i = 0; i < this.Posts.length; i++) {
  this.Posts[i].commentafficher = false;
  }
}

viewcomment(id: any) {
for(let i = 0; i < this.Posts.length; i++) {
  if (id == this.Posts[i].id) {
      this.http.get('http://localhost:3000/api/comment/'+id, httpOptions).subscribe(data =>{
          this.Comment = data;
          this.Posts[i].check = true; 
          this.Posts[i].commentafficher = true;
    })  
  } else {
    this.Posts[i].commentafficher = false;
  }
}

}

deletecomment(id: Number) {
  for (let i = 0; i < this.Comment.length; i++) {
      this.commentservice.deleteComment(id).subscribe(data => {
          console.log(data)
          location.reload();
        });
        break;
}
}

    
  }
