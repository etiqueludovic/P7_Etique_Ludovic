import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthMessage } from '../../services/message.service';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-update-message',
  templateUrl: './update-message.component.html',
  styleUrls: ['./update-message.component.scss']
})
export class UpdateMessageComponent implements OnInit {
  Posts:any=[];
  @Input() title!: string;
  @Input() content!: string;
  userId!: number;
  @Input() onFileChanged!: any;
  username!: string;
  dataPost!: any;
  fileData!: File;
  previewUrl:any = null;
  fileUploadProgress!: string;
  uploadedFilePath!: string;
  modif_t!: boolean;
  modif_c!: boolean;
  dataItem: any;
  retrieveResponse: any;
  base64DataProfil: any;
  retrievedImageprofil: any;
  constructor(private router: Router,
              private http: HttpClient,
              private service: AuthMessage,
              private _snackBar: MatSnackBar,
              private sanitizer: DomSanitizer
              ) { }

  ngOnInit(): void {
    this.ListMessages();
  }

  ListMessages() {
    
    const str = window.location.pathname
    const num = str.charAt(str.length-1)
    console.log(num)
      this.service.ViewOneMessage(num).subscribe(data => {
      this.Posts=data;
      this.dataItem = this.Posts.id;    
      this.getImage();   
      })
    }

  UpdateOn_t() {
    this.modif_t = true
  }
  UpdateOn_c() {
    this.modif_c = true
  }
  Cancel_t() {
    this.modif_t = false;
  }
  Cancel_c() {
    this.modif_c = false;
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

  titre = this.title;
  contenent = this.content;

  onSubmit(form: NgForm) {
    const str = window.location.pathname
    const num = str.charAt(str.length-1)
    if (form.value.title) {
    const formulaireTitle = {
      'title': form.value.title,
      'postId': num,
    }
    const id = JSON.parse(sessionStorage['token']).userId;
    this.service.updateTitleMessage(id, formulaireTitle)
    .subscribe(() => {
      console.log('Titre mis à jour !');
    })
    if (form.value.content){
      const formulaireContent = {
        'title': form.value.title,
        'postId': num,
      }
      const id = JSON.parse(sessionStorage['token']).userId;
      this.service.updateContentMessage(id, formulaireContent)
      .subscribe(() => {
        console.log('Titre mis à jour !');
      })
    }
    if (this.fileData.name){
      const formulaireContent = {
        'imageUrl': this.fileData.name,
        'postId': num,
      }
      const id = JSON.parse(sessionStorage['token']).userId;
      this.service.updateContentMessage(id, formulaireContent)
      .subscribe(() => {
        console.log('Titre mis à jour !');
      })
    }
  }
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

  getImage() {
    for(let j = 0; j < this.Posts.length; j++) {
    this.http.get(this.Posts[j].profil_image, {responseType: 'blob'})
      .subscribe(
        res => {
          this.retrieveResponse = res;
          this.base64DataProfil = URL.createObjectURL(this.retrieveResponse);
          this.Posts[j].retrievedImageprofil = this.sanitizer.bypassSecurityTrustUrl(this.base64DataProfil);
        })
      }
    }

}
