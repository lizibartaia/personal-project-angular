import { Component, OnInit } from '@angular/core';
import { map,Observable, Subscription } from 'rxjs';
import { AnswerType } from '../answer.type';
import { QuestionInterface } from '../question.interface';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question$:Observable<QuestionInterface>;
  answers$:Observable<AnswerType[]>;
  correctAnswer:AnswerType;
  currentAnswer:AnswerType|null;
  correctAnswerSubscription:Subscription;
  currentAnswerSubscription:Subscription;
  constructor(private quizService:QuizService) { 
    this.question$=this.quizService.state$.pipe(
      map((state)=>state.questions[state.currentQuestionIndex])
    )
    this.answers$=this.quizService.state$.pipe(
      map((state)=>state.answers)
    )

    
   
  }

  ngOnInit(): void {
    this.correctAnswerSubscription=this.question$.pipe(map(question => question.correctAnswer)).subscribe(
      correctAnswer => this.correctAnswer = correctAnswer
    );
    this.currentAnswerSubscription=this.quizService.state$.pipe(
      map((state)=> state.currentAnswer)).subscribe(currentAnswer => this.currentAnswer=currentAnswer)
    
    
  }

  ngOnDestroy():void{
    this.correctAnswerSubscription.unsubscribe()
    this.currentAnswerSubscription.unsubscribe()

  }



  selectAnswer(answer : AnswerType):void{
    this.quizService.selectAnswer(answer);

  }

  isWrongAnswer(answer : AnswerType):boolean{
     if(!this.currentAnswer || !this.correctAnswer){
      return false;
     }
     return this.currentAnswer === answer && this.currentAnswer !== this.correctAnswer

  }
  isCorrectAnswer(answer : AnswerType):boolean{
    if(!this.currentAnswer || !this.correctAnswer){
      return false;
     }
     return Boolean(this.currentAnswer) && answer === this.correctAnswer;


  }
  isDisabledAnswer(answer : AnswerType):boolean{
    if(!this.currentAnswer || !this.correctAnswer){
      return false;
     }
     return Boolean(this.currentAnswer)


  }

}
