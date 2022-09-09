import { AnswerType } from "./answer.type";

export interface backendQuestionInterface{
    question:string;
    incorrect_answers:AnswerType[];
    correct_answer:AnswerType
}