import { Component } from '@angular/core';
import { connectionService } from './connection-service';
import { loginComponent } from './user/login/login.component';

let token = ''; 
let userId = '';
if (sessionStorage['token']){
    token = JSON.parse(sessionStorage['token']).token;
    userId = JSON.parse(sessionStorage['token']).id
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  notif: string | undefined;
  id = userId;
 
  constructor(private connect: connectionService, private login: loginComponent) {}

    ngOnInit(){
      this.connect.getServer().subscribe((response: any) => {
        this.notif = response.text;
        console.log("Requête compléte !")
      })

    }

    Sedeconnecter(){
      this.login.onSignOut()
    }
  
}