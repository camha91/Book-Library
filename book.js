class Book {
    constructor() {
        this.books = [];
    }

    addBookToList(title, author, pages, status) {
        const book = {
            // "id": this.books.length,
            "title": title,
            "author": author,
            "pages": pages,
            "status": status
        }
        this.books.push(book);
    }

    getAllBooks() {
        return this.books;
    }
}

export const bookCtrl = new Book();