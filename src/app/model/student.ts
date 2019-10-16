import { Book } from './book';

export class Student {
    id: number;
    firstName: string;
    lastName: string;
    groupName: string;
    books: Book[];

    constructor(){
        this.books =  new Array();
    }
}
