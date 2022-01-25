import { Component } from '@angular/core';
import { connectionService } from './connection-service';
import { loginComponent } from './user/login/login.component';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProfilComponent } from './user/user-profil/user-profil.component';
import { UserService } from './services/user.service';
import { DomSanitizer } from '@angular/platform-browser';

let token = ''; 
let userId = '';
if (sessionStorage['token']){
    token = JSON.parse(sessionStorage['token']).token;
    userId = JSON.parse(sessionStorage['token']).userId
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  notif: string | undefined;
  id = userId;
 
  constructor(private fb: FormBuilder, 
              private connect: connectionService, 
              private login: loginComponent, 
              private http: HttpClient,
              private profil: ProfilComponent,
              private userService: UserService, 
              private sanitizer: DomSanitizer
              ) {}

    ngOnInit(){
      this.connect.getServer().subscribe((response: any) => {
        this.notif = response.text;
        console.log("Requête compléte !")
      })

      this.UserProfilComp();

    }

    Sedeconnecter(){
      this.login.onSignOut()

    }

    userForm!: FormGroup | any;
    isPhotoError = false;
    image!: string;
    submitted : boolean = false;
    uploadError: string = '';
    Profil: any=[];
    retrieveResonse!: Blob;
    base64Data!: string;
    retrievedImage: any;

    UserProfilComp(){
      this.userService.getprofil(JSON.parse(sessionStorage['token']).userId).subscribe(data => {
        this.Profil = [data];     
            this.http.get(this.Profil[0].profil_image, {responseType: 'blob'})
              .subscribe((res) => {
                this.retrieveResonse = res;
                this.base64Data = URL.createObjectURL(this.retrieveResonse);
                this.retrievedImage = this.sanitizer.bypassSecurityTrustUrl(this.base64Data)
          })
        })
    }
  }