import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthMessage } from '../../services/message.service';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private router: Router,
              private http: HttpClient,
              private authMessage: AuthMessage,
              private _snackBar: MatSnackBar
              ) { }

  ngOnInit(){
    if (token) {
      this.isAuth = true;
      this.username = JSON.parse(sessionStorage['token']).username;
    }
  }

  fileProgress(fileInput: any) {
    const files = fileInput.target.files[0]
    this.fileData = files;
    console.log('ici fileData : ')
    console.log(this.fileData)
    this.preview();
}

  preview() {
    const ImageUrl = new FormData();
    ImageUrl.append('file', this.fileData, this.fileData.name);
    console.log('ici imageURl : ')
    console.log(this.fileData)
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }

  onSubmit(form: NgForm) {
    const ImageUrl = new FormData();
    ImageUrl.append('file', this.fileData, this.fileData.name);
    console.log('ici imageURl : ')
    console.log(ImageUrl)
    const formulaire = {
      'title': form.value.title,
      'content': form.value.content,
      'ImageUrl': this.fileData.name,
      'userId': JSON.parse(sessionStorage['token']).id,
      'username': JSON.parse(sessionStorage['token']).username
    }
    console.log(formulaire)
    this.authMessage.addfile(ImageUrl)
    this.authMessage.addMessage(formulaire)
    .subscribe(() => {
      console.log('Enregistré !');
      this._snackBar.open("Message créé avec succès !")
      console.log(formulaire);
      this.router.navigate(['/messages']);
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
