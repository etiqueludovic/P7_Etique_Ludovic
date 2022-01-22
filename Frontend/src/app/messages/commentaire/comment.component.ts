import { formatCurrency } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.services';
import { AuthMessage } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

let id = ''; 
let token = '';
console.log("Ici ce trouve le token avant log")
if (sessionStorage['token']){
    id = JSON.parse(sessionStorage['token']).userId
    token = JSON.parse(sessionStorage['token']).token
}

const httpOptions : any    = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      responseType: 'text'

    })
  };

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
  })
  export class CommentComponent implements OnInit {

    Posts: any=[];
    utilisateurId: any = id;
    @Input() content: any;
    Comment: any=[];
    commentafficher!: boolean;
    check!: Boolean;
    checkc!: Boolean;
    index!: any;
    event!: any;
    com!: any;
    checkcom!: boolean;

    constructor( private commentservice: CommentService, private messageservice: AuthMessage, private http: HttpClient ) {}

    ngOnInit(): void {
        
       this.messageservice.viewMessages().subscribe(data =>{
            this.Posts = data; 
        })
        this.commentservice.getComment().subscribe(data => {
            this.Comment = data;
            for (let i = 0; i < this.Posts.length; i++) {
            if (this.Posts[i].id == this.Comment[i].post_id){
                this.Posts[i].checkcom =true;
                }
            }
        })
        
        console.log(this.com)
        this.commentafficher = false;

        
    }

    addcomment(form: NgForm) {
            
                this.messageservice.viewMessages().subscribe(data_m =>{
                    for (let i = 0; i < this.Posts.length; i++) {
                    this.Posts = data_m
                const comment = {
                    content: form.value.content,
                    post_id: this.Posts[i].id,
                    user_name: this.Posts[i].username,
                    user_id: this.utilisateurId
                }
            
                this.commentservice.addComment(comment)
                .subscribe(() => {
                    console.log("commentaire créé !")
                })
                }
            })
        }

    commentMasquer() {
        this.commentafficher = false;
    }

    viewcomment(id: any) {
        for(let i = 0; i < this.Posts.length; i++) {
                this.http.get('http://localhost:3000/api/comment/'+id, httpOptions).subscribe(data =>{
                    this.Comment = data;
                    if (id) {
                    this.Posts[i].check = true; 
                }      
            })  
        }
    }

    deletecomment(id: Number) {
            for (let i = 0; i < this.Comment.length; i++) {
                this.commentservice.deleteComment(id).subscribe(data => {
                    console.log(data)
                  });
                  break;
        }
    }
}