import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService} from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  datas: any;

  constructor(private service:UserService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  UserList:any=[];
  Userparse: any;
  Userid: any;

  retrieveResponse: any;
base64DataProfil: any;
retrievedImageprofil: any;
 

  ngOnInit(): void {
    this.ListUser();
  }

  ListUser(){
    this.service.getUserList().subscribe(data => {
      console.log(data)
      this.UserList=data
        for(let j = 0; j < this.UserList.length; j++) {
        this.http.get(this.UserList[j].profil_image, {responseType: 'blob'})
          .subscribe(
            res => {
              this.retrieveResponse = res;
              this.base64DataProfil = URL.createObjectURL(this.retrieveResponse);
              this.UserList[j].retrievedImageprofil = this.sanitizer.bypassSecurityTrustUrl(this.base64DataProfil);
              console.log("image profil ici ->>>>")
              console.log(this.UserList[j].retrievedImageprofil)
            })
          }
        })
    }

}
