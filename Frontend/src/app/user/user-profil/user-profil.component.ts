import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class ProfilComponent implements OnInit {

  Profil:any=[];

  @Input() password!: string;
  @Input() email!: string;
  @Input() username!: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.UserProfil();
  }

  UserProfil(){
    this.userService.getprofil(JSON.parse(sessionStorage['token']).id).subscribe(data => {
      this.Profil = [data];     
    })
    
  }

  UpdateProfil(form: NgForm) {
    const usersign = {
      'email': form.value.email,
      'password': form.value.password,
      'username': form.value.username
    }
    this.userService.updateUser(usersign)
    .subscribe(() => {
      console.log('Modifié !');
    })
  }

}
