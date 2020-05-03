import { User } from '../models/user';


export interface LoginResponse{
    user: User,
    token: string,
}

export interface Profiles{
    id: string,
    name: string,
    photo: string, 
    history: Array<number>,
    favorite:Array<number>,
    reading:Array<number>
}

export interface Book {
    id: string,
    author: String, 
    genre: String, 
    editorial: String,
    image: String,
    bookPDF: String
}