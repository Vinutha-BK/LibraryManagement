"use strict";
var BookData = (function () {
    function BookData() {
    }
    BookData.prototype.createDb = function () {
        var books = [
            {
                'id': 1,
                'bookName': 'Leaf Rake',
                'bookCode': 'GDN-0011',
                'releaseDate': 'March 19, 2016',
                'description': 'Leaf rake with 48-inch wooden handle.',
                'price': 19.95,
                'starRating': 3.2,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png',
                'tags': ['rake', 'leaf', 'yard', 'home']
            },
            {
                'id': 2,
                'bookName': 'Garden Cart',
                'bookCode': 'GDN-0023',
                'releaseDate': 'March 18, 2016',
                'description': '15 gallon capacity rolling garden cart',
                'price': 32.99,
                'starRating': 4.2,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png'
            },
            {
                'id': 5,
                'bookName': 'Hammer',
                'bookCode': 'TBX-0048',
                'releaseDate': 'May 21, 2016',
                'description': 'Curved claw steel hammer',
                'price': 8.9,
                'starRating': 4.8,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png',
                'tags': ['tools', 'hammer', 'construction']
            },
            {
                'id': 8,
                'bookName': 'Saw',
                'bookCode': 'TBX-0022',
                'releaseDate': 'May 15, 2016',
                'description': '15-inch steel blade hand saw',
                'price': 11.55,
                'starRating': 3.7,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png'
            },
            {
                'id': 10,
                'bookName': 'Video Game Controller',
                'bookCode': 'GMG-0042',
                'releaseDate': 'October 15, 2015',
                'description': 'Standard two-button video game controller',
                'price': 35.95,
                'starRating': 4.6,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png'
            }
        ];
        return { books: books };
    };
    return BookData;
}());
exports.BookData = BookData;
//# sourceMappingURL=book-data.js.map