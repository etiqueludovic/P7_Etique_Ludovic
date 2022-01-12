import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { loginComponent } from '../login/login.component';
import { Router } from "@angular/router";
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class AuthComponent implements OnInit {

  emailinput = document.getElementsByName('email');
  UserList:any=[];
  user = {
    email: '',
    password: '',
    username: ''
  };

  submitted = false;


  @Input() password!: string;
  @Input() email!: string;
  @Input() username!: string;
  @Input() verif: boolean | undefined;

    authStatus!: Boolean;
    constructor(private router: Router, private connectionService: UserService) { }

    ngOnInit(): void {
      this.ListUser();
    }
    

    ListUser(){
      this.connectionService.getUserList().subscribe(data => {
        console.log(this.UserList.email)
        this.UserList=data
      })
      
    }
    
    onSignUp(form: NgForm) {
      console.log(form.value['email'] );
      const usersign = {
        'email': form.value.email,
        'username': form.value.username,
        'password': form.value.password
      }
      console.log(usersign);
      this.connectionService.addUser(usersign)
    .subscribe(() => {
      console.log('Enregistré !');
      }) 
    }

    onEmailChange(email: any) {
      this.verif = this.verif;
      this.email = email
      console.log(this.emailinput)
      console.log(this.verif)
      console.log(email)
    }

  }