import { Component, OnInit, ɵɵgetCurrentView } from '@angular/core';
import { distinctUntilChanged, map,Observable } from 'rxjs';
import { QuizService } from '../quiz.service';
import {  Router} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  questionsLength$:Observable<number>;
  currentQuestionIndex$:Observable<number>;
  showResults$:Observable<boolean>;
  correctAnswerCount$:Observable<number>;

  constructor(private quizService:QuizService,private router:Router) { 
    this.questionsLength$=this.quizService.state$.pipe(
      map((state)=>state.questions.length)
    )
    this.currentQuestionIndex$=this.quizService.state$.pipe(
      map((state)=>state.currentQuestionIndex+1)
    )
    this.showResults$=this.quizService.state$.pipe(
      map((state)=>state.showResults)
    )
    this.correctAnswerCount$=this.quizService.state$.pipe(
      map((state)=>state.correctAnswerCount)
    )
  }

  ngOnInit(): void {
    this.quizService.getQuestions();

  }

  nextQuestion():void{
    this.quizService.nextQuestion();

  }

  restart():void{
    this.quizService.restart();
  }

  buttonback(){
    this.router.navigate(['home'])
  }

 

}
