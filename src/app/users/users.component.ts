import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Pipe, PipeTransform} from '@angular/core';
import {RegisterUsersService} from '../register-users.service'
import {RegisterUser} from '../register/registerUser.interface'
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


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  
  displayColumns: string[]=['name','email','phone','date_of_birth','experience_level', 'already_participated','character_id'];
  data:RegisterUser[]=[];
 
  
  constructor(private RegisterUsersService:RegisterUsersService,private dialog:MatDialog,private router:Router) { 
     
  }

  ngOnInit(): void {
    this.getUsersDetails();
    
  }

  getUsersDetails(){
    this.RegisterUsersService.getUsers().subscribe(
      (resp) => {
        console.log(resp);
        this.data=resp;
        
      },
      (err) => {
        console.log(err);
      }
    );

  }

  delete(element:any){
    this.RegisterUsersService.delete(element.id).subscribe(
      res=>{
        console.log(res)
        this.getUsersDetails()
        console.log("deleted row")
      },err=>{
        console.log(err)
      }
    )
  }

  nextClicked(){
    this.router.navigate(['quiz'])
  }

}
