import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {RegisterUsersService} from '../register-users.service'
import {Pipe, PipeTransform} from '@angular/core';
import {grands, RegisterUser} from '../register/registerUser.interface'
import { Router } from '@angular/router';


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


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})


export class ExperienceComponent implements OnInit {

  
  regform=this.RegisterUsersService.RegisterForm;
  grandData:grands[];
 



  constructor(private RegisterUsersService:RegisterUsersService,private formBuilder:FormBuilder,private router:Router) { }
  

  ngOnInit(): void {

    this.grandData=[
      {id:1,name:"Mikhail Tal",image:"https://i.postimg.cc/FRg2nD85/Mikhail-Tal-img.jpg"},
      {id:2,name:"Bobby Fischer",image:"https://i.postimg.cc/rpdV3XN6/bobby-fischer-img.jpg"},
      {id:3,name:"Magnus Carlsen",image:"https://i.postimg.cc/Kj5xBZxT/magnus-carlsen-img.jpg"}

    ] 
    
  }

  experienced(regform:any){
    this.RegisterUsersService.register_user(regform.value).subscribe(
      (resp) => {
        console.log(resp);
        
      },
      (err) => {
        console.log(err);
      }
    );

  }

  Nextclick(){
    if(this.regform.controls.experience_level.valid && this.regform.controls.character_id.valid && this.regform.controls.already_participated.valid){
      console.log("valid")
      console.log(this.regform)
      this.router.navigate(['users'])
    }else{
      
      console.log("invalid")
    }
   
  }

  backbtn(){
    this.router.navigate(['register'])
  }





}
