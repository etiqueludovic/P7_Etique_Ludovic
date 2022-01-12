import { Component, OnInit } from '@angular/core';
import { UserService} from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private service:UserService) { }

  UserList:any=[];
  Userparse: any;
  Userid: any;
 

  ngOnInit(): void {
    this.ListUser();
  }

  ListUser(){
    this.service.getUserList().subscribe(data => {
      console.log(data)
      this.UserList=data
      //this.Userparse = JSON.parse(this.UserList)
      console.log(this.UserList.id)
    })
  }

}
