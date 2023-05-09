import {Question} from "./Question"
export interface Answer{
    _id:string,
    title: string,
    createdAt: Date,
    question: Question
}

// title: {
//     type: String,
//     required:[true,"question title alanı boş bırakılamaz"]
// },
// createdAt:{
//     type:Date,
//     default:Date.now
// },
// question:{
//     type:mongoose.Schema.ObjectId,
//     ref:"Question"
// }