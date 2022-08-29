import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterUser} from './registerUser'
import {Pipe, PipeTransform} from '@angular/core';

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
      character_id: AbstractControl;
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
  

  constructor(private formBuilder:FormBuilder) {
    }


  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email ]],
      phone: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      experience_level: ['', Validators.required],
      already_participated: ['', Validators.required],
      character_id: ['', Validators.required]
    }) as unknown as RegisterUserFormGroup;
  }


    
  getErrorMessage() {
    if (this.RegisterForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.RegisterForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  get email(): any{
    return this.RegisterForm.controls.email;
    }


}

