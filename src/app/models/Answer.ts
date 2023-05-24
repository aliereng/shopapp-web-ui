import {Question} from "./Question"
export interface Answer{
    _id:string,
    title: string,
    createdAt: Date,
    question: Question
}

