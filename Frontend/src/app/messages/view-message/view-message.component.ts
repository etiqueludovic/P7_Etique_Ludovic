import { Component, OnInit } from '@angular/core';
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

  constructor(private activedRoute: ActivatedRoute, private msgService: AuthMessage, private router: Router) { }

  ngOnInit(): void {

    this.activedRoute.params.subscribe(data => {
      this.userId = data['id'];
      console.log("ici l'ID du message :")
      console.log(this.userId);
    });

    this.msgService.ViewOneMessage(this.userId).subscribe(data => {
      this.Post = data;
    });
  }

  DeleteMessage(){
      if (this.userId == JSON.parse(sessionStorage['token']).id){
      this.msgService.deleteMessage(this.userId).subscribe(data => {
      this.router.navigate(['/delete']);
      });
    }
  }

}
