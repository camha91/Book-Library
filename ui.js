
// UI Selectors
export const UISelectors = {
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

class UICtrl{
    // Get Data for Book
    getInput() {
        const bookInput = [];

        const title = document.querySelector(UISelectors.bookTitle);
        const author = document.querySelector(UISelectors.bookAuthor);
        const pages = document.querySelector(UISelectors.bookPages);
        const status = document.querySelector(UISelectors.bookStatus);
        
        
        if (![validateBook(title.value, author.value, pages.value)]) {
            bookInput.push(title.value, author.value, pages.value);
            debugger;
        } if (status.checked) {
            bookInput.push('Done');
        } else {
            bookInput.push('Not Yet');
        }
        
        return bookInput;
    }
    
    // Validate Book Input
    validateBook(title, author, pages) {
        // Validate form
        if (title === '' || author === '' || pages === '') {
            this.showAlert('Please enter all fields', 'error');
        }
    }

    // Show All Books
    displayBook(books) {
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
    clearAllFields() {
        document.querySelector(UISelectors.bookTitle).value = '';
        document.querySelector(UISelectors.bookAuthor).value = '';
        document.querySelector(UISelectors.bookPages).value = '';
        document.querySelector(UISelectors.bookStatus).checked = false;
    }


    // Show Alert
    showAlert(message, className) {

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
        container.insertBefore(div, cardContent);

        // Set time out
        setTimeout(
            () => {
                div.remove();
            }, 3000
        ); // clear alert
    }


    // Fill Form To Edit/Delete Book
    renderToForm(bookName, bookAuthor, bookPages, bookStatus) {
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

    // Enable Update and Delete Buttons
    enableUpdateAndDeleteButtons() {
        const disabledUISelectors = [UISelectors.updateBtn, UISelectors.deleteBtn];
        
        disabledUISelectors.forEach((selector) => {
            const enableBtn = document.querySelector(selector);
            if (enableBtn.classList.contains('disabled')) {
                enableBtn.classList.remove('disabled');
            };
        })
    }

    // Disable Update and Delete Buttons
    disabledUpdateAndDeleteButtons() {
        const enableButtons = [UISelectors.updateBtn, UISelectors.deleteBtn];

        enableButtons.forEach((selector) => {
            const enableBtn = document.querySelector(selector);
            if (!(enableBtn.classList.contains('disabled'))) {
                enableBtn.classList.add('disabled');
            };
        })
    }

}

const ui = new UICtrl();
export default ui;