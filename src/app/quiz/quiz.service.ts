import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { QuizStateInterface } from './quizState.interface';
import { QuestionInterface } from './question.interface';
import { AnswerType } from './answer.type';
import { HttpClient } from '@angular/common/http';
import { backendQuestionInterface } from './backendQuestions.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  apiUrl='https://opentdb.com/api.php?amount=10&category=16&difficulty=medium&type=multiple'
  initialState:QuizStateInterface={
    questions:[],
    currentQuestionIndex:0,
    showResults:false,
    correctAnswerCount:0,
    answers:[],
    currentAnswer: null,

  }
  state$=new BehaviorSubject<QuizStateInterface>({...this.initialState});

  constructor(private http:HttpClient) { }

  setState(partialState:Partial<QuizStateInterface>):void{
    this.state$.next({...this.state$.getValue(),...partialState});

  }

  getState():QuizStateInterface{
    return this.state$.getValue();

  }

  nextQuestion():void{
    const state=this.getState();
    const newShowResults= state.currentQuestionIndex===state.questions.length-1;
    const newCurrentQuestionIndex = newShowResults ? state.currentQuestionIndex : state.currentQuestionIndex+1;
    const newAnswers= newShowResults ? []: this.shuffleAnswers(state.questions[newCurrentQuestionIndex])

    this.setState(
      {
        currentQuestionIndex:newCurrentQuestionIndex,
        showResults:newShowResults,
        answers:newAnswers,
        currentAnswer:null,
      }
    )

  }
  restart():void{
    this.setState(this.initialState);
    this.getQuestions();
  }

  selectAnswer(answer:AnswerType):void{
    const state= this.getState();
    const newCorrectAnswerCount= answer===state.questions[state.currentQuestionIndex].correctAnswer ?
    state.correctAnswerCount+1 : state.correctAnswerCount;
    this.setState({currentAnswer:answer, correctAnswerCount:newCorrectAnswerCount});
    console.log("selected answer",answer)
  }

  shuffleAnswers(question: QuestionInterface):AnswerType[] {
    const unshuffledAnswers=[
      ...question.incorrectAnswers,
      question.correctAnswer,

    ]
    return unshuffledAnswers.map((unshuffledAnswer) => ({sort:Math.random(),value:unshuffledAnswer,})).sort((a,b)=>a.sort-b.sort).map((el)=>el.value);



  }

  normalizeQuestions(backendQuestions: backendQuestionInterface[]):QuestionInterface[]{
    return backendQuestions.map((backendQuestion) => {
      const incorrectAnswers = backendQuestion.incorrect_answers.map((backendIncorrectAnswer)=>
      decodeURIComponent(backendIncorrectAnswer));
      return{
        question: decodeURIComponent(backendQuestion.question),
        correctAnswer:decodeURIComponent(backendQuestion.correct_answer),
        incorrectAnswers,

      };
    });
   


  }

  getQuestions():void{
    this.http.get<{results:backendQuestionInterface[]}>(this.apiUrl).pipe(map((response) => response.results)).subscribe(
      (questions) =>this.loadQuestions(questions)
    );

  }

  loadQuestions(backendQuestions: backendQuestionInterface[]):void{
    console.log("ques",backendQuestions)
    const normalizedQuestions=this.normalizeQuestions(backendQuestions)
    const initialAnswers=this.shuffleAnswers(normalizedQuestions[0])
    this.setState({questions:normalizedQuestions,answers:initialAnswers})

  }


}
