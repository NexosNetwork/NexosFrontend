import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN = 'w-token';
const USER = 'w-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor( private router: Router) { }

  static saveToken(token:string): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user:any): void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string{
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any{
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId(): string{
    const user = this.getUser();
    if(user==null){return '';}
    return user.id
  }

  static getUserRole(): string{
    const user = this.getUser();
    if(user==null){return '';}
    return user.role;
  }

 static isAdminLoggedIn(): boolean{
  if(this.getToken === null){
    return false;
  }
  const role: string = this.getUserRole();
  return role == 'ADMIN';
 }

 static isCustomerLoggedIn(): boolean{
  if(this.getToken === null){
    return false;
  }
  const role: string = this.getUserRole();
  return role == 'CUSTOMER';
 }

 static signOut(): void{
  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem(USER);
 }

 static tokenExpired() {
  const expiry = (JSON.parse(atob(this.getToken().split('.')[1]))).exp;
  return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}

 createAuthorizationHeader(): HttpHeaders {
  if (UserStorageService.tokenExpired()) {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
  let authHeaders: HttpHeaders = new HttpHeaders();
  return authHeaders.set(
    'Authorization',
    'Bearer ' + UserStorageService.getToken()
  );
}
}
