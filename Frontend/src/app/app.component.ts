import { Component } from '@angular/core';
import { connectionService } from './connection-service';
import { loginComponent } from './user/login/login.component';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProfilComponent } from './user/user-profil/user-profil.component';

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
              private profil: ProfilComponent
              ) {}

    ngOnInit(){
      this.connect.getServer().subscribe((response: any) => {
        this.notif = response.text;
        console.log("Requête compléte !")
      })

      this.profil.UserProfil();

    }

    Sedeconnecter(){
      this.login.onSignOut()

    }

    userForm!: FormGroup | any;
    isPhotoError = false;
    image!: string;
    submitted : boolean = false;
    uploadError: string = '';

    newForm =  () => {
      this.userForm = this.fb.group({
        photo         : ['', Validators.compose([Validators.required])]
      })
    }
  
    PostData() {
      this.submitted = true;
      if(!this.userForm.valid) {
         false;
      }
      if (this.userForm.get('photo').invalid) {
         this.isPhotoError = true;
      }
      this.uploadError = '';
      const formData = new FormData();
      formData.append('photo', this.userForm.get('photo').value);
      this.http.post('http://localhost:3000/upload', formData).subscribe((resp: any) => {
        if(resp['status'] == 'success') {
           alert('File saved in file-upload-server/uploads');
        }
      });
  
  
    }
  
    onFileSelect(file: Event) {
      this.userForm.patchValue({ photo: file });
      this.userForm.get('photo').updateValueAndValidity();
    }
  }