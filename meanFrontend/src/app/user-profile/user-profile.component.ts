import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
import { NgForm } from '@angular/forms';

import { Router } from "@angular/router";
import { User } from '../shared/user.model';


declare var M: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails= {  
    _id   : "",
    email : "",
    fullName : "",
    age : "",
    group : "",
    food : "",
    race : "",
    password : ""
  };
  _id : string = "";
  user : string = "";
  submitted = false;
  message: string = "";
  listFriends : any;

 
  constructor(public userService : UserService, private router : Router) {
  }

ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (res:any) => {
        this.userDetails = res['user']
        console.log('this is details', this.userDetails)
      },
      err => {}
    );
    this.refreshUserList();
    this.getFriend(this.user) ; 
  }
  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['login'])
  }
resetForm(form?: NgForm) {
  if (form)
    form.reset();
  this.userService.selectedUser = {
    _id: "",
    email : "",
    fullName : "",
    age : "",
    group : "",
    food : "",
    race : "",
    password: ""
  }
}
// //getFriend
getFriend(user : any) {
  this.userService.friendShip(user).subscribe((response) =>  {
    console.log('----inside getFriend----', response)
    this.listFriends = response
  }
  )}

// userList
refreshUserList() {
this.userService.getUserList().subscribe((res) => {
  this.userService.users = res as User[];
});
}

//delete user on userList
onDelete( _id: string) {
  if (confirm('Are you sure to delete this record ?') == true) {
    this.userService.deleteUser(_id).subscribe((res: any) => {
      this.refreshUserList();
      this.resetForm();
      this.message = "User Deleted Successfully!"
    });
  }
}





}


 



