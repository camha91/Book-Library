import { UISelectors } from './ui';
import ui from './ui';
import { bookCtrl } from './book';


// Listen for add button
document.querySelector(UISelectors.addBtn).addEventListener('click', addBook);

// Listen to edit state
document.querySelector(UISelectors.bookList).addEventListener('click', editBook);

// Listen to update button
document.querySelector(UISelectors.updateBtn).addEventListener('click', updateBook);

// Listen for delete button
document.querySelector(UISelectors.deleteBtn).addEventListener('click', deleteBook);

// Listen for back button
document.querySelector(UISelectors.backBtn).addEventListener('click', back);

// Listen for clear all button
document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAll);




// Add Book
function addBook(e) {
    const [bookTitle, bookAuthor, bookPages, bookStatus] = ui.getInput();
    bookCtrl.addBookToList(bookTitle, bookAuthor, bookPages, bookStatus);
    ui.showAlert('Book Added', 'success');
    ui.displayBook(bookCtrl.getAllBooks());
    debugger;
    ui.clearAllFields();

    e.preventDefault();
}


// Edit Book
function editBook(e) {
    if(e.target.parentElement.classList.contains("edit")){
        const id = e.target.parentElement.parentElement.parentElement.id.split('-')[1];
        currentBook = bookCollection[id];
        renderToForm(currentBook.title, currentBook.author, currentBook.pages, currentBook.status);
    }
    
    ui.enableUpdateAndDeleteButtons();

    e.preventDefault();
}

// Update Book
function updateBook(e) {
    const updateBook = getInput();

   currentBook = {
        "id": currentBook.id,
        "title": updateBook[0],
        "author": updateBook[1],
        "pages": updateBook[2],
        "status": updateBook[3]
    };
    validateBook(currentBook);

    bookCollection.forEach(book => {
        if (book.id === currentBook.id) {
            book.title = currentBook.title;
            book.author = currentBook.author;
            book.pages = currentBook.pages;
            book.status = currentBook.status;
            showAlert('Book Updated', 'success');
        }
    })
    ui.displayBook(bookCollection);
    ui.clearAllFields();
    ui.disabledUpdateAndDeleteButtons();

    e.preventDefault();
}

// Delete Book
function deleteBook(e) {
    if (confirm('Are you sure?')) {
        bookCollection.splice(currentBook.id, 1);
        showAlert('Book Removed', 'success');
        }
    ui.displayBook(bookCollection);
    ui.clearAllFields();
    ui.disabledUpdateAndDeleteButtons();

    e.preventDefault();
}

// Back button
function back(e) {
    ui.clearAllFields();
    ui.disabledUpdateAndDeleteButtons();

    e.preventDefault();
}


// Clear All 
function clearAll(e) {
    bookCollection.splice(0, bookCollection.length);
    ui.displayBook(bookCollection);

    e.preventDefault();
}
