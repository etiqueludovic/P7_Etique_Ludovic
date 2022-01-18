import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../services/user.service';
import { AuthUser } from '../../services/auth.service'
import { NgForm } from '@angular/forms';


let currentUser : any = '';
let token = ''; 
if (sessionStorage['token']){
    token = JSON.parse(sessionStorage['token']).token
}



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class loginComponent implements OnInit {
  tokens: any;
  
  message!: boolean;

  user = {
    email: '',
    password: '',
  }

  @Input() password!: any;
  @Input() email!: any;
 
  userId!: any;

    isAuth!: boolean;
    constructor(private router: Router, private connectionService: UserService, private authUser: AuthUser) { }
    
    ngOnInit() {

      if (token){
        this.isAuth = true
        this.router.navigate(['messages']);
      } else {
        this.isAuth = false
      }
      
      console.log("ici isAuth :"+this.isAuth+"-- auth  :"+token)
  }

    onSignIn(form: NgForm) {
        console.log(form.value);
        const logsign = {
          email: form.value.email,
          password: form.value.password,
        }
        this.connectionService.Login(logsign)
        .subscribe((data) => {
            this.isAuth = true;
            currentUser = data
            sessionStorage.setItem('token', JSON.stringify(data))
            console.log('connexion réussi !');
            location.reload()
          }
        )
      }

    onSignOut() {
      sessionStorage.clear();
      this.isAuth = false;
      location.reload()
    }

}