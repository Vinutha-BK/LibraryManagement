import {  PipeTransform, Pipe } from '@angular/core';
import { IBook } from '../service/book';

@Pipe({
    name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {

    transform(value: Array<any>, title:string,author: string,userId: string,userName: string,issueDate: string,genre:string): IBook[] {

if (value && value.length){

         return value.filter(item =>{
                if (title && item.bookTitle.toLowerCase().indexOf(title.toLowerCase()) === -1){
                    return false;
                }
                if (author && item.author.toLowerCase().indexOf(author.toLowerCase()) === -1){
                    return false;
                }
                if (userId && item.userId.toLowerCase().indexOf(userId.toLowerCase()) === -1){
                    return false;
                }
                if (userName && item.userName.toLowerCase().indexOf(userName.toLowerCase()) === -1){
                    return false;
                }
                if (issueDate && item.issuedDateTime.toLowerCase().indexOf(issueDate.toLowerCase()) === -1){
                    return false;
                }
                if (genre && item.genre.toLowerCase().indexOf(genre.toLowerCase()) === -1){
                    return false;
                }
                return true;
           })
        }
                else{
            return value;
        }
        }

}
