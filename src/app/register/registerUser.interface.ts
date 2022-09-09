import { AbstractControl, FormGroup } from "@angular/forms";

export interface RegisterUser{
    name: string,
    email: string,
    phone: string,
    date_of_birth: string,
    experience_level: string,
    already_participated: boolean,
    character_id: number
    

}

export interface grands{
    id:number;
    name:string,
    image:string
}

export interface Login{
    email:string;
    character_id:number
}

