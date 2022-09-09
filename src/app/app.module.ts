import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizModule } from './quiz/quiz.module';
 
// import { QuestionComponent } from './question/question.component';
// import { AnswerComponent } from './answer/answer.component';

@NgModule({
  declarations: [
    AppComponent,
    
    // QuestionComponent,
    // AnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    QuizModule
    
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
