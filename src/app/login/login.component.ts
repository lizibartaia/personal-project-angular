import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RegisterUsersService} from '../register-users.service'
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Pipe, PipeTransform} from '@angular/core';
import {RegisterUser,Login} from '../register/registerUser.interface'

@Pipe({
  name: 'formControl',
})
export class FormControlPipe implements PipeTransform {
  transform(value: AbstractControl): FormControl {
      return value as FormControl;
  }
}
interface LoginFormGroup extends FormGroup {
  value: Login;

  controls: {
      email:AbstractControl,
      character_id:AbstractControl
       
  };
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform=this.RegisterUsersService.LoginForm;
  token:any

  constructor(private RegisterUsersService:RegisterUsersService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
  }

  getemailMessage() {
    if (this.RegisterUsersService.LoginForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.RegisterUsersService.LoginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  signIn(){
    this.RegisterUsersService.getUsers().subscribe(
      (res)=>{
          const user= res.find((a:any)=>{
          return a.email === this.loginform.value.email && a.character_id === this.loginform.value.character_id

        });
        if(user){
          console.log(user)
          console.log("successfully logged in")
          this.router.navigate(['users'])

        }else{
          alert("user not found")
        }
      },err=>{
        alert("something went wrong")
      }
    )
  }

}
