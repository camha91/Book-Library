
let bookCollection = [];
let currentBook = {};

// UI Selectors
const UISelectors = {
    clearBtn: '.clear-btn',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    bookTitle: '#book-name',
    bookAuthor: '#book-author',
    bookPages: '#book-pages',
    bookStatus: '#book-status',
    totalBooks: '.total-books',
    bookList: '.book-list',
    bookContainer: '.card',
    cardContent: '.card-content'

}

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
    const bookInput = getInput();        
    currentBook = {
        "id": bookCollection.length,
        "title": bookInput[0],
        "author": bookInput[1],
        "pages": bookInput[2],
        "status": bookInput[3]
    };

    validateBook(currentBook);
    
    bookCollection.push(currentBook);
    showAlert('Book Added', 'success');

    displayBook(bookCollection);

    clearAllFields();

    e.preventDefault();
}

function validateBook(currentBook) {
    // Validate form
    if (currentBook.title === '' || currentBook.author === '' || currentBook.pages === '' || currentBook.status === '') {
        showAlert('Please enter all fields', 'error');
    }
}


// Edit Book
function editBook(e) {
    if(e.target.parentElement.classList.contains("edit")){
        const id = e.target.parentElement.parentElement.parentElement.id.split('-')[1];
        currentBook = bookCollection[id];
        renderToForm(currentBook.title, currentBook.author, currentBook.pages, currentBook.status);
    }
    
    enableUpdateAndDeleteButtons();

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
    displayBook(bookCollection);
    clearAllFields();
    disabledUpdateAndDeleteButton();

    e.preventDefault();
}

// Delete Book
function deleteBook(e) {
    if (confirm('Are you sure?')) {
        bookCollection.splice(currentBook.id, 1);
        showAlert('Book Removed', 'success');
        }
    displayBook(bookCollection);
    clearAllFields();
    disabledUpdateAndDeleteButton();

    e.preventDefault();
}

// Back button
function back(e) {
    clearAllFields();
    disabledUpdateAndDeleteButton();

    e.preventDefault();
}


// Clear All 
function clearAll(e) {
    bookCollection.splice(0, bookCollection.length);
    displayBook(bookCollection);

    e.preventDefault();
}



// Get Data for Book
function getInput() {
    const title = document.querySelector(UISelectors.bookTitle).value;
    const author = document.querySelector(UISelectors.bookAuthor).value;
    const pages = document.querySelector(UISelectors.bookPages).value;
    const status = (() => {
        if (document.querySelector(UISelectors.bookStatus).checked) {
            return "Done"
        } else {
            return "Not Yet"
        }
    })();
    
    return [title, author, pages, status];
}

// Show All Books
function displayBook(books) {
    const bookUIElement = document.querySelector(UISelectors.bookList);
    bookUIElement.innerHTML = '';
    books.forEach((book) => {
        bookUIElement.innerHTML += `
        <tr id="book-${book.id}">
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.status}</td>
            <td><a href="#" class="edit table-link">
                <i class="fa fa-pencil-square-o"></i>
            </a></td>
        </tr>
        `;
    })
}

// Clear all fields
function clearAllFields() {
    document.querySelector(UISelectors.bookTitle).value = '';
    document.querySelector(UISelectors.bookAuthor).value = '';
    document.querySelector(UISelectors.bookPages).value = '';
    document.querySelector(UISelectors.bookStatus).checked = false;
}


// Show Alert
function showAlert(message, className) {

    // Create div element
    const div = document.createElement('div');
    // Add class name
    div.className = className;

    div.style = 'color:red';

    // Add message
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(UISelectors.bookContainer);
    // Get book card
    const cardContent = document.querySelector(UISelectors.cardContent);
    // Insert before
    // debugger;
    container.insertBefore(div, cardContent);

    // Set time out
    setTimeout(
        () => {
            div.remove();
        }, 3000
    ); // clear alert
}


// Fill Form To Edit/Delete Book
function renderToForm(bookName, bookAuthor, bookPages, bookStatus) {
    document.querySelector(UISelectors.bookTitle).value = bookName;
    document.querySelector(UISelectors.bookAuthor).value = bookAuthor;
    document.querySelector(UISelectors.bookPages).value = bookPages;
    document.querySelector(UISelectors.bookStatus).value = bookStatus;

    // Validate check box
    if (bookStatus === "Done") {
        return document.querySelector(UISelectors.bookStatus).checked = true;
    } else {
        return document.querySelector(UISelectors.bookStatus).checked = false;
    };
}


function enableUpdateAndDeleteButtons() {
    const disabledUISelectors = [UISelectors.updateBtn, UISelectors.deleteBtn];
    
    disabledUISelectors.forEach((selector) => {
        const enableBtn = document.querySelector(selector);
        if (enableBtn.classList.contains('disabled')) {
            enableBtn.classList.remove('disabled');
        };
    })
}

function disabledUpdateAndDeleteButton() {
    const enableButtons = [UISelectors.updateBtn, UISelectors.deleteBtn];

    enableButtons.forEach((selector) => {
        const enableBtn = document.querySelector(selector);
        if (!(enableBtn.classList.contains('disabled'))) {
            enableBtn.classList.add('disabled');
        };
    })
}
