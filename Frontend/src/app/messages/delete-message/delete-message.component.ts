import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthMessage } from 'src/app/services/message.service';

@Component({
  selector: 'app-delete-message',
  templateUrl: './delete-message.component.html',
  styleUrls: ['./delete-message.component.scss']
})
export class DeleteMessageComponent implements OnInit {

  Post!: any;
  userId: string = '';
  constructor(private activatedRoute: ActivatedRoute, private msgService: AuthMessage) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(data => {
      this.userId = data['id'];
      console.log("ici l'ID du message :")
      console.log(this.userId);
    });

    this.msgService.deleteMessage(this.userId).subscribe(data => {
      console.log(data)
    });
  }

}
