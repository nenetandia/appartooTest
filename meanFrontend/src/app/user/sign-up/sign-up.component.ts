import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
 })
export class SignUpComponent implements OnInit {
  emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  successMessage = "boolean";
  alertMessage = "string";
 
  constructor(public userService : UserService) {
    this.successMessage = '';
    this.alertMessage= '';
   }

  ngOnInit(): void {
  }
  onSubmit(form : NgForm) {
    this.userService.postUser(form.value).subscribe(
      Res=>{
        this.successMessage = "true";
        this.resetForm(form);
       },
      err => {
        if(err.status = 422) {
          this.alertMessage = err.error.join('<br/>');
        }
        else
        this.alertMessage = 'Something went wrong. Please try later'
      }
    ); 
  }
  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      _id : '',
      fullName: '',
      age: '',
      group: '',
      race: '',
      food: '',
      email   : '',
      password: ''
    };
    form.resetForm();
    this.alertMessage = '';
   
  }
}
  
