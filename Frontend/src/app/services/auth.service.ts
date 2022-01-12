import { Injectable } from "@angular/core";


let token = ''; 
if (sessionStorage['token']){
    token = JSON.parse(sessionStorage['token']).token
}

@Injectable()
export class AuthUser {

    constructor() {}

    auth!: boolean;

    IsAuthOk() {
        if (token){
            this.auth = true
        } else {
            this.auth = false
        }
    }
        

}

