import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router"; 

import { UserService } from '../../shared/user.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  token : string;
  frontErrMessage: string;

  constructor(private userService : UserService, private router : Router) {
    this.token = '';
    this.frontErrMessage= '';

  }

  model ={
    email: '',
    password:''
  };
  emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

ngOnInit() {
  if(this.userService.isLoggedIn())
  this.router.navigateByUrl('/userprofile');
}

onSubmit(form : NgForm){
  this.userService.login(form.value).subscribe(
    (res : any )=> {
      this.userService.setToken(res['token']);
      this.router.navigateByUrl('/userprofile');
    },
    err => {
      this.frontErrMessage = err.error.message;
    }
  );
}





}
