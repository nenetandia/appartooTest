import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http' ;

import { User } from './user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    _id     : '',
    fullName: '',
    age     : '',
    group      : '',
    race      : '',
    food      : '',
    email   : '', 
    password: ''
  };
  users: User[];

  noAuthHeader = { headers : new HttpHeaders({ 'NoAuth' : 'True' }) }
  constructor(public http: HttpClient) {
    this.users = [];
   }
  //  http 
  
   postUser(user: User){
     return this.http.post(environment.apiBaseUrl+'/register', user, this.noAuthHeader); 
   }
   login(authCredentials: string) {
    return this.http.post(environment.apiBaseUrl +'/authenticate', authCredentials, this.noAuthHeader); 
  }
  getUserProfile() {
    return this.http.get(environment.apiBaseUrl +'/userProfile'); 
  }

  getUserList() {
    return this.http.get(environment.apiBaseUrl +'/register');
  }

  putUser(user: User) {
    return this.http.put(environment.apiBaseUrl + `/${user._id}`, user);
  }
  putFriendshipValue(user: User) {
    return this.http.put(environment.apiBaseUrl + `/${user._id}` + '/status', user);
  }

  deleteUser(_id: string) {
    return this.http.delete(environment.apiBaseUrl + `/${_id}`);
  }
  friendShip(user: User) {
    return this.http.post(environment.apiBaseUrl +'/myFriends', user);

  }

  // -----helpers

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }


}
