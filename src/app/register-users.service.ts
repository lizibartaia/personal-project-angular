import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterUsersService {

  constructor(private http: HttpClient) { }
  // API="http://localhost:3000";
  API="https://chess-tournament-api.devtest.ge/api/register"
 

  public register_user(userdata :any){
    return this.http.post(this.API+'/users',userdata);


  }

}
