/* Defines the book entity */
export interface IBook {
    id: number;
    author:string;
    bookTitle: string;
    tags?: string[];
    description: string;
    starRating: number;
    thumbnailImage: string;
    isbn:number;
    genre?: string[];
    renewDateTime:string;
    userId:string;
    userName:string;
    issuedDateTime:string;
    location:string;
}
