import { Component, OnInit,Input, EventEmitter,Output, HostListener } from '@angular/core';
import { AnswerType } from '../answer.type';

@Component({
  selector: 'app-quiz-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input('answerText') answerTextProps!:string;
  @Input('index') indexProps!:number;
  @Input('correctAnswer') correctAnswerProps!:AnswerType;
  @Input('currentAnswer') currentAnswerProps!:AnswerType | null;


  @Output('selectAnswer')selectAnswerEvent = new EventEmitter<AnswerType>();
  @HostListener('click', ['$event'])
  onClick(){
    this.selectAnswerEvent.emit(this.answerTextProps)
  }

  letterMapping:string[]=['A','B','C','D']


  constructor() { }

  ngOnInit(): void {
    if(!this.answerTextProps || this.indexProps===undefined){
      throw new Error('inputs in answer are not correct') 
    }
    console.log('11',this.correctAnswerProps,this.currentAnswerProps)
    
  }
  

}
