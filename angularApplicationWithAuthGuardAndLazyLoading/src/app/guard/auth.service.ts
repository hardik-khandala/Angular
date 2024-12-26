import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private credentials = [
    {
      username: 'admin',
      password: 'admin'
    },
    {
      username: 'hardik',
      password: '1234'
    }
  ]

  isValidLogin: boolean = false;
  checkCredentials(username: string, password: string): boolean {
    if(!username || !password){ 
      this.isValidLogin = false;
      return false;
    }else{
      if(this.credentials.find(cred => cred.username === username && cred.password === password)){
        this.isValidLogin = true;
        return true;
      }else{
        this.isValidLogin = false;
        return false;
      }
    }
    // const credentials = this.credentials.find(cred => cred.username === username && cred.password === password);
    // return credentials !== undefined;
  // }
}
}
