import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {grands, Login, RegisterUser} from './register/registerUser.interface'
import {Pipe, PipeTransform} from '@angular/core';
import { delay, Observable, of } from 'rxjs';

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

interface grandsFormGroup extends FormGroup {
  value: grands;

  controls: {
      id:AbstractControl,
      name: AbstractControl;
      image:AbstractControl
       
  };
}

interface LoginFormGroup extends FormGroup {
  value: Login;

  controls: {
      email:AbstractControl,
      character_id:AbstractControl
       
  };
}




@Injectable({
  providedIn: 'root'
})
export class RegisterUsersService {
  

    RegisterForm : RegisterUserFormGroup= this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2) ]],
    email: ['', [Validators.required, Validators.email ]],
    phone: ['', [Validators.required,Validators.pattern("^[0-9]*$"),
    Validators.minLength(10), Validators.maxLength(10)]],
    date_of_birth: ['', Validators.required],
    experience_level: ['', Validators.required],
    already_participated: ['', Validators.required],
    character_id:['',Validators.required]
  }) as unknown as RegisterUserFormGroup;

  LoginForm:LoginFormGroup=this.formBuilder.group({
    email:['', [Validators.required, Validators.email ]],
    character_id:['',Validators.required]
  }) as unknown as LoginFormGroup;


  constructor(private http: HttpClient,private formBuilder:FormBuilder) { 

  }
  API="http://localhost:3000";


  public register_user(userdata :any){
    return this.http.post(this.API+'/users',userdata);

  }
  
  public getUsers():Observable<[]>{
    return this.http.get<[]>(this.API+'/users');
  }

  
  public delete(id:any){
    return this.http.delete(this.API + "/users/" + id)

  }

}
