import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IBook } from '../service/book';


export class BookData implements InMemoryDbService {

    createDb() {
        let books: IBook[] = [
            {
                'id': 1,
                'author': 'Chethan Bhagath',
                'bookTitle': 'Two states',
                'tags': ['rake', 'leaf', 'yard', 'home'],
                'description': "",
                'starRating': 2.8,
                'thumbnailImage': "",
                'isbn': 1244,
                'genre': ['music','moral'],
                'renewDateTime': "",
                'userId': "vinutha0589@gmail.com",
                'userName': "vinu",
                'issuedDateTime': "",
                'location': "F-C12"
            },
            {
                'id': 2,
                'author': 'Jane Austen',
                'bookTitle': 'Pride and Prejudice',
                'tags': ['rake', 'leaf', 'yard', 'home'],
                'description': "Austen’s most celebrated novel tells the story of Elizabeth Bennet, a bright, lively young woman with four sisters, and a mother determined to marry them to wealthy men. At a party near the Bennets’ home in the English countryside, Elizabeth meets the wealthy, proud Fitzwilliam Darcy. Elizabeth initially finds Darcy haughty and intolerable, but circumstances continue to unite the pair. Mr. Darcy finds himself captivated by Elizabeth’s wit and candor, while her reservations about his character slowly vanish. The story is as much a social critique as it is a love story, and the prose crackles with Austen’s wry wit.",
                'starRating': 4.0,
                'thumbnailImage': "http://books.google.com/books/content?id=s1gVAAAAYAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                'isbn': 13414143455,
                'genre': ['music','fiction'],
                'renewDateTime': "2017-06-08T21:29:34.647Z",
                'userId': "user@anytimelibrary.com",
                'userName': "anu",
                'issuedDateTime': "2017-05-24T21:29:34.647Z",
                'location': "B-C16"
            },
            {
                'id': 3,
                'author': 'Manuel Orozco',
                'bookTitle': 'Freedom in One Country',
                'tags': ['rake', 'leaf', 'yard', 'home'],
                'description': "",
                'starRating': 2.8,
                'thumbnailImage': "http://books.google.com/books/content?id=s1gvAAAAYAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                'isbn': 97892827678223,
                'genre': ['music'],
                'renewDateTime': "12/2/2017",
                'userId': "",
                'userName': "",
                'issuedDateTime': "",
                'location': "B-D12"
            },
            {
                'id': 4,
                'author': 'Brian Bercusson',
                'bookTitle': 'Equal Opportunities and Collective Bargaining in Europe',
                'tags': ['rake', 'leaf', 'yard', 'home'],
                'description': "",
                'starRating': 2.8,
                'thumbnailImage': "http://books.google.com/books/content?id=S1gvAAAAYAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                'isbn': 9789282767856,
                'genre': ['music'],
                'renewDateTime': "",
                'userId': "",
                'userName': "",
                'issuedDateTime': "",
                'location': "string"
            },
            {
                'id': 5,
                'author': 'Chad Adams',
                'bookTitle': 'Learning Python Data Visualization',
                'tags': ['rake', 'leaf', 'yard', 'home'],
                'description': "If you are a Python novice or an experienced developer and want to explore data visualization libraries, then this is the book for you. No prior charting or graphics experience is needed",
                'starRating': 2.8,
                'thumbnailImage': "http://books.google.com/books/content?id=AepaBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                'isbn': 135135453634,
                'genre': ['music'],
                'renewDateTime': "12/2/2017",
                'userId': "abc@amcon.com",
                'userName': "anu",
                'issuedDateTime': "",
                'location': "string"
            }
        ];

         let users: IBook[] = [
            {
                'id': 1,
                'author': 'mc chaco',
                'bookTitle': 'unread stories',
                'tags': ['rake', 'leaf', 'yard', 'home'],
                'description': "",
                'starRating': 2.8,
                'thumbnailImage': "",
                'isbn': 1244,
                'genre': ['music'],
                'renewDateTime': "12/2/2017",
                'userId': "abc@amcon.com",
                'userName': "anu",
                'issuedDateTime': "",
                'location': "string"
            },
            {
                'id': 2,
                'author': 'mc chaco',
                'bookTitle': 'unread stories1',
                'tags': ['rake', 'leaf', 'yard', 'home'],
                'description': "",
                'starRating': 2.8,
                'thumbnailImage': "",
                'isbn': 1244,
                'genre': ['music'],
                'renewDateTime': "12/2/2017",
                'userId': "abc@amcon.com",
                'userName': "anu",
                'issuedDateTime': "",
                'location': "string"
            },
            {
                'id': 3,
                'author': 'mc chaco',
                'bookTitle': 'unread stories2',
                'tags': ['rake', 'leaf', 'yard', 'home'],
                'description': "",
                'starRating': 2.8,
                'thumbnailImage': "",
                'isbn': 1244,
                'genre': ['music'],
                'renewDateTime': "12/2/2017",
                'userId': "abc@amcon.com",
                'userName': "anu",
                'issuedDateTime': "",
                'location': "string"
            },
            {
                'id': 4,
                'author': 'mc chaco',
                'bookTitle': 'unread stories3',
                'tags': ['rake', 'leaf', 'yard', 'home'],
                'description': "",
                'starRating': 2.8,
                'thumbnailImage': "",
                'isbn': 1244,
                'genre': ['music'],
                'renewDateTime': "12/2/2017",
                'userId': "abc@amcon.com",
                'userName': "anu",
                'issuedDateTime': "",
                'location': "string"
            },
            {
                'id': 5,
                'author': 'mc chaco',
                'bookTitle': 'unread stories4',
                'tags': ['rake', 'leaf', 'yard', 'home'],
                'description': "",
                'starRating': 2.8,
                'thumbnailImage': "",
                'isbn': 1244,
                'genre': ['music'],
                'renewDateTime': "12/2/2017",
                'userId': "abc@amcon.com",
                'userName': "anu",
                'issuedDateTime': "",
                'location': "string"
            }
        ];
        
        return { books };
    }
}
