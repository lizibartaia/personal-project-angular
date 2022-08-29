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

