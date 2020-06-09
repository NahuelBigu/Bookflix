export class Book {
    _id: string;
    isbn:string;
    name: string;
    synopsis: string;
    author: string;
    genre: string;
    editorial: string;
    image: string;
    bookPDF: string;
    active: boolean;
    maxChapters: number;
    chapters: Array<String>;
    duedate: String;
    trailers: Array<String>
    //Capitulos es un arreglo de Strings y duedate es Date
}