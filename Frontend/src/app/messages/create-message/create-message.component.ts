import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthMessage } from '../../services/message.service';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

let token = ''; 
if (sessionStorage['token']){
  token = JSON.parse(sessionStorage['token']).token
}

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {
  @Output() onFileSelect: EventEmitter<Object> = new EventEmitter();
  @Input() title!: string;
  @Input() content!: string;
  userId!: number;
  @Input() onFileChanged!: any;
  fileData!: File;
  previewUrl:any = null;
  fileUploadProgress!: string;
  uploadedFilePath!: string;
  emojiForm: any;
  username!: string;
  isAuth!: boolean;
  Profil: any=[];

  constructor(private router: Router,
              private http: HttpClient,
              private authMessage: AuthMessage,
              private _snackBar: MatSnackBar,
              private userService: UserService
              ) { }

  ngOnInit(){
    if (token) {
      this.isAuth = true;
      this.username = JSON.parse(sessionStorage['token']).username;
    }
    
    
  }
  selectedFile!: File;

  fileProgress(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
    this.preview();
}




  preview() {
    const ImageUrl = new FormData();
    ImageUrl.append('file', this.selectedFile, this.selectedFile.name);
    console.log('ici imageURl : ')
    console.log(this.selectedFile)
    // Show preview 
    var mimeType = this.selectedFile.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();      
    reader.readAsDataURL(this.selectedFile); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }

  onSubmit(form: NgForm) {
    this.userService.getprofil(JSON.parse(sessionStorage['token']).userId).subscribe(data => {
      this.Profil = [data];     
    const formulaire = {
      'title': form.value.title,
      'content': form.value.content,
      'ImageUrl': this.selectedFile.name,
      'userId': JSON.parse(sessionStorage['token']).userId,
      'username': JSON.parse(sessionStorage['token']).username,
      'profil_image': this.Profil[0].profil_image
    }
    console.log(formulaire)
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name)
    this.http.post('http://localhost:3000/images', fd)
    .subscribe(res => {
      console.log(res)
    })
    this.authMessage.addMessage(formulaire)
    .subscribe(() => {
      console.log('Enregistré !');
      this._snackBar.open("Message créé avec succès !")
      console.log(formulaire);
      this.router.navigate(['/messages']);
      })
    })
    
  }

  
  
  showEmojiPicker = false;
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
        this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: { emoji: { native: any; }; }) {
    console.log(this.content)
    const { content } = this;
    console.log(content);
    console.log(`${event.emoji.native}`)
    const text = `${content}${event.emoji.native}`;

    this.content = text;
    // this.showEmojiPicker = false;
  }

  onFocus() {
    console.log('focus');
    this.showEmojiPicker = false;
  }
  onBlur() {
    console.log('onblur')
  }

    
}
