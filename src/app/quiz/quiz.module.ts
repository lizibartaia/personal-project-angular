import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import { RouterModule, Routes } from '@angular/router';
import { QuizService } from './quiz.service';

const routes:Routes=[
  {
    path:'',
    component:QuizComponent
  }
]


@NgModule({
  declarations: [
    QuizComponent,
    QuestionComponent,
    AnswerComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers:[QuizService]
})
export class QuizModule { }
