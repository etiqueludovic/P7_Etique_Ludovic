import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


let userId = ''; 
if (sessionStorage['token']){
    userId = JSON.parse(sessionStorage['token']).userId
}

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
  @Input() bio!: String;
  retrieveResonse!: Blob;
  base64Data!: string;
  retrievedImage: any;
  selectedFile!: File;
  modif_e!: boolean;
  modif_u!: boolean;
  modif_b!: boolean;
  modif_p!: boolean;
  userId =  userId;
  idUrl !: any;
  error: any;

  constructor(private userService: UserService, private http: HttpClient, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit(): void {
    this.UserProfil();
  }

  UserProfil(){
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

  UpdateOn_e() {
    this.modif_e = true
  }
  UpdateOn_u() {
    this.modif_u = true
  }
  UpdateOn_b() {
    this.modif_b = true
  }
  UpdateOn_p() {
    this.modif_p = true
  }
  Cancel() {
    this.modif_e = false;
    this.modif_u = false;
    this.modif_b = false;
    this.modif_p = false;
  }


  UpdateEmail(form: NgForm) {
    const emailform = {
      'userId': this.userId,
      'email': form.value.email,  
    }
    this.userService.updateEmail(emailform)
    .subscribe(() => {
      this.modif_e = false;
      console.log('Modifi?? !');
    })
  }

  UpdateBio(form: NgForm) {
    const bio = {
      'userId': this.userId,
      'bio': form.value.bio,  
    }
    this.userService.updateBio(bio)
    .subscribe(() => {
      this.modif_b = false;
      console.log('Modifi?? !');
    })
  }

  UpdateUsername(form: NgForm) {
    const username = {
      'userId': this.userId,
      'username': form.value.username
    }
    this.userService.updateUsername(username)
    .subscribe(() => {
      this.modif_u = false;
      console.log('Modifi?? !');
    })
  }

  UpdatePass(form: NgForm) {
    const pass = {
      'userId': this.userId,
      'password': form.value.password,  
    }
    this.userService.updatePass(pass)
    .subscribe(() => {
      this.modif_p = false;
      console.log('Modifi?? !');
    })
  }
 
  UpdateProfil_image() {
    const profil_image = {
      'userId': this.userId,
      'profil_image': this.selectedFile.name,  
    }
    this.userService.updateProfil_image(profil_image)
    .subscribe(() => {
      this.onUpload()
      console.log('Modifi?? !');
    })
  }
    
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name)
    this.http.post('http://localhost:3000/images', fd)
    .subscribe(res => {
      console.log(res)
    })
  }

  DeleteAccount() {
    this.userId = this.Profil[0].userId
    this.userService.deleteUser(this.userId).subscribe(() => {
      console.log("compte supprim?? !!")
      sessionStorage.clear();
      this.router.navigate(['register']);
      location.reload();
    })
  }
  
}
