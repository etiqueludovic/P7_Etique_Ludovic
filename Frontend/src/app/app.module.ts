import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AuthComponent } from './user/register/register.component';
import { RouterModule, Routes } from "@angular/router";
import { MessagesComponent } from './messages/list-messages/messages.component';
import { ProfilComponent } from './user/user-profil/user-profil.component';
import { CreateMessageComponent } from './messages/create-message/create-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FourcentfourComponent } from './fourcentfour/fourcentfour.component';
import { AuthGuard } from './services/auth-guard.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { connectionService } from './connection-service';
import { AuthMessage } from './services/message.service';
import { UserService } from './services/user.service';
import { loginComponent } from './user/login/login.component';
import { AuthUser } from './services/auth.service';
import { DeleteMessageComponent } from './messages/delete-message/delete-message.component';
import { UpdateMessageComponent } from './messages/update-message/update-message.component';
import { ViewMessageComponent } from './messages/view-message/view-message.component';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { CommentService } from './services/comment.services';
import { CommentComponent } from './messages/commentaire/comment.component';

const appRoutes: Routes = [
  { path: 'register', component: AuthComponent},
  { path: 'login', component: loginComponent},
  { path: 'userslist', component: UserComponent},
  { path: 'messages', 
      children: [
        { path: '', component: MessagesComponent },
        { path: 'edit/:id', component: UpdateMessageComponent },
        { path: 'delete/:id', component: DeleteMessageComponent },
        { path: 'view/:id', component: ViewMessageComponent }
  ]},
  { path: 'create-message',canActivate: [AuthGuard], component: CreateMessageComponent},
  { path: 'user-profil/:id', canActivate: [AuthGuard], component: ProfilComponent},
  { path: '', component: MessagesComponent},
  { path: 'not-found', component: FourcentfourComponent},
  { path: '**', redirectTo: '/not-found'}

]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AuthComponent,
    loginComponent,
    MessagesComponent,
    ProfilComponent,
    CreateMessageComponent,
    FourcentfourComponent,
    DeleteMessageComponent,
    UpdateMessageComponent,
    CommentComponent,
    ViewMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatSnackBarModule,
    PickerModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard,
    AuthUser,
    loginComponent,
    AuthMessage,
    HttpClient,
    UserService,
    connectionService,
    CommentService,
    ProfilComponent,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
