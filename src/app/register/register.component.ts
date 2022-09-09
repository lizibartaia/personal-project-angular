import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterUser} from './registerUser.interface'
import {Pipe, PipeTransform} from '@angular/core';
import { Router } from '@angular/router';
import {RegisterUsersService} from '../register-users.service'
 

@Pipe({
  name: 'formControl',
})
export class FormControlPipe implements PipeTransform {
  transform(value: AbstractControl): FormControl {
      return value as FormControl;
  }
}



interface RegisterUserFormGroup extends FormGroup {
  value: RegisterUser;

  controls: {
      name: AbstractControl;
      email: AbstractControl;
      phone: AbstractControl;
      date_of_birth: AbstractControl;
      experience_level: AbstractControl;
      already_participated: AbstractControl;
      character_id:AbstractControl
  };
}



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 
  regform = this.RegisterUsersService.RegisterForm;
  
  

  constructor(private formBuilder:FormBuilder,private router:Router,private RegisterUsersService:RegisterUsersService) {
    }


  ngOnInit(): void {
   
  }


  getemailMessage() {
    if (this.RegisterUsersService.RegisterForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.RegisterUsersService.RegisterForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }
  getnameErrorMessage() {
    if (this.RegisterUsersService.RegisterForm.controls.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.RegisterUsersService.RegisterForm.controls.name.hasError('minlength') ? 'Name must be at least 2 characters long.' : '';
  }
  
  getphoneErrorMessage() {
    if (this.RegisterUsersService.RegisterForm.controls.phone.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.RegisterUsersService.RegisterForm.controls.phone.hasError('pattern')) {
      return 'Phone number format is not valid';
    }
    if (this.RegisterUsersService.RegisterForm.controls.phone.hasError('maxlength')) {
      return 'Phone number must be at least 10 numbers, try again.';
    }

    return this.RegisterUsersService.RegisterForm.controls.phone.hasError('minlength')? 'Phone number must be at least 10 numbers' : '';
  }

  getdobMessage(){
    if (this.RegisterUsersService.RegisterForm.controls.date_of_birth.hasError('required')) {
      return 'You must enter a value';
    }

    return this.RegisterUsersService.RegisterForm.controls.email.hasError('email') ? 'Not a valid value' : '';

  }

  onbackclick(){
    this.router.navigate(['home'])

  }

  onNextclick(){
    if(this.regform.controls.name.valid && this.regform.controls.email.valid && this.regform.controls.phone.valid && this.regform.controls.date_of_birth.valid){
      console.log("valid")
      console.log(this.regform)
      this.router.navigate(['experience'])
    }else{
      
      console.log("invalid")
    }

      

  }

  register(regform:any){
    this.RegisterUsersService.register_user(regform.value).subscribe(
      (resp) => {
        console.log(resp);
        
      },
      (err) => {
        console.log(err);
      }
    );

  }

  
}

