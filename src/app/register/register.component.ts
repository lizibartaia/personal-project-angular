import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterUser} from './registerUser'
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

  // We need to add these manually again, same fields as IUser
  controls: {
      name: AbstractControl;
      email: AbstractControl;
      phone: AbstractControl;
      date_of_birth: AbstractControl;
      experience_level: AbstractControl;
      already_participated: AbstractControl;
  };
}



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterForm:RegisterUserFormGroup;
  // name = new FormControl('', [Validators.required]);
  // email = new FormControl('', [Validators.required, Validators.email]);
  // phone = new FormControl('', [Validators.required]);
  // dob = new FormControl('', [Validators.required]); 
  

  constructor(private formBuilder:FormBuilder,private router:Router,private RegisterUsersService:RegisterUsersService) {
    }


  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2) ]],
      email: ['', [Validators.required, Validators.email ]],
      phone: ['', [Validators.required,Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]],
      date_of_birth: ['', Validators.required],
      experience_level: ['', Validators.required],
      already_participated: ['', Validators.required],
    }) as unknown as RegisterUserFormGroup;
  }



    
  getemailMessage() {
    if (this.RegisterForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.RegisterForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }
  getnameErrorMessage() {
    if (this.RegisterForm.controls.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.RegisterForm.controls.name.hasError('minlength') ? 'Name must be at least 2 characters long.' : '';
  }
  
  getphoneErrorMessage() {
    if (this.RegisterForm.controls.phone.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.RegisterForm.controls.phone.hasError('pattern')) {
      return 'Phone number format is not valid';
    }
    if (this.RegisterForm.controls.phone.hasError('maxlength')) {
      return 'Phone number must be at least 10 numbers, try again.';
    }

    return this.RegisterForm.controls.phone.hasError('minlength')? 'Phone number must be at least 10 numbers' : '';
  }

  getdobMessage(){
    if (this.RegisterForm.controls.date_of_birth.hasError('required')) {
      return 'You must enter a value';
    }

    return this.RegisterForm.controls.email.hasError('email') ? 'Not a valid value' : '';

  }

  onbackclick(){
    this.router.navigate(['home'])

  }

  onNextclick(){
    this.router.navigate(['experience'])

  }

  register(RegisterForm:any){
    this.RegisterUsersService.register_user(RegisterForm.value).subscribe(
      (resp) => {
        console.log(resp);
        
      },
      (err) => {
        console.log(err);
      }
    );

  }

  






  

}

