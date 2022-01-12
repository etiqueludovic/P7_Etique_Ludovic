import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthMessage } from '../../services/message.service';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'

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
  constructor(private router: Router,
              private http: HttpClient,
              private authMessage: AuthMessage,
              private _snackBar: MatSnackBar
              ) { }

  ngOnInit(): void {
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
    }
    console.log(formulaire)
    this.authMessage.addfile(ImageUrl)
    this.authMessage.addMessage(formulaire)
    .subscribe(() => {
      console.log('Enregistré !');
      this._snackBar.open("Message mis à jour avec succès !")
      console.log(formulaire);
      this.router.navigate(['/messages']);
      })
    
  }

}
