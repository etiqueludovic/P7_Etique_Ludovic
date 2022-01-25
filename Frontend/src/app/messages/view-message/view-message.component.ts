import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthMessage } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

let id = '';
let username = ''; 
let IsAdmin = 0;
if (sessionStorage['token']){
  id = JSON.parse(sessionStorage['token']).userId,
  username = JSON.parse(sessionStorage['token']).username,
  IsAdmin = JSON.parse(sessionStorage['token']).IsAdmin
}

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss']
})
export class ViewMessageComponent implements OnInit {
  Posts: any=[];
  User: any=[];
  userId: string = id;
  postId: string = '';
  imageName: any;
  retrieveResonse: any;
  base64Data: any;
  retrievedImage: any;
  retrievedImageProfil: any;
  isAdmin: any = IsAdmin;
  dateCreat!: any;
  

  constructor(private activedRoute: ActivatedRoute, private msgService: AuthMessage, private router: Router,  private http: HttpClient, private sanitizer: DomSanitizer, private user: UserService) { }
  cheminImage!: any;
  ngOnInit(): void {

    this.activedRoute.params.subscribe(data => {
      this.postId = data['id'];
    });
   
    this.msgService.ViewOneMessage(this.postId).subscribe(data => {
      this.Posts = data;
      this.http.get('http://localhost:3000/images/' + this.Posts[0].imageUrl, {responseType: 'blob'})
          .subscribe(
            res => {
              this.retrieveResonse = res;
              this.base64Data = URL.createObjectURL(this.retrieveResonse);
              this.retrievedImage = this.sanitizer.bypassSecurityTrustUrl(this.base64Data);
            })
            const date = new Date(this.Posts[0].CreatAt)
            this.dateCreat = date;
    
     });
     this.getImage();
     
  }

  DeleteMessage(){
      if (this.postId == JSON.parse(sessionStorage['token']).id){
      this.msgService.deleteMessage(this.postId).subscribe(() => {
      this.router.navigate(['/delete']);
      });
    }
  }

  getImage() {
    this.user.getUserList().subscribe(data => {
      this.User = data;
      console.log("ici c'est le bordel")
      let id = this.Posts[0].userId;
      const URL = this.User[id].profil_image;
        this.http.get(URL, {responseType: 'blob'})
          .subscribe(
            res => {
              this.retrieveResonse = res;
              this.base64Data = URL.createObjectURL(this.retrieveResonse);
              this.retrievedImageProfil = this.sanitizer.bypassSecurityTrustUrl(this.base64Data);
            })
          })
      }
}
