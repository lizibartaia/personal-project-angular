import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
 

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  selectFormControl = new FormControl('', Validators.required);
   


  constructor() { }

  ngOnInit(): void {
  }

}
