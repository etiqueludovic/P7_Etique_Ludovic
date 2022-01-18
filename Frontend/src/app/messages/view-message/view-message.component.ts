import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthMessage } from 'src/app/services/message.service';

let username = ''; 
if (sessionStorage['token']){
  username = JSON.parse(sessionStorage['token']).username
}

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss']
})
export class ViewMessageComponent implements OnInit {
  Post: any=[];
  userId: string = '';
  imageName: any;
  retrieveResonse: any;
  base64Data: any;
  retrievedImage: any;
  

  constructor(private activedRoute: ActivatedRoute, private msgService: AuthMessage, private router: Router,  private http: HttpClient, private sanitizer: DomSanitizer) { }
  cheminImage!: any;
  ngOnInit(): void {

    this.activedRoute.params.subscribe(data => {
      this.userId = data['id'];
      console.log("ici l'ID du message :")
      console.log(this.userId);
    });
   
    this.msgService.ViewOneMessage(this.userId).subscribe(data => {
      this.Post = data;
      this.http.get('http://localhost:3000/images/' + this.Post[0].imageUrl, {responseType: 'blob'})
          .subscribe(
            res => {
              this.retrieveResonse = res;
              this.base64Data = URL.createObjectURL(this.retrieveResonse);
              this.retrievedImage = this.sanitizer.bypassSecurityTrustUrl(this.base64Data);
            })
        console.log(this.cheminImage)
     });
  }

  DeleteMessage(){
      if (this.userId == JSON.parse(sessionStorage['token']).id){
      this.msgService.deleteMessage(this.userId).subscribe(data => {
      this.router.navigate(['/delete']);
      });
    }
  }

  getImage() {
        //Make a call to Sprinf Boot to get the Image Bytes.
        this.http.get('http://localhost:3000/images/' + this.imageName, {responseType: 'blob'})
          .subscribe(
            res => {
              this.retrieveResonse = res;
              this.base64Data = URL.createObjectURL(this.retrieveResonse);
              this.retrievedImage = this.sanitizer.bypassSecurityTrustUrl(this.base64Data);
            })
          }
}
