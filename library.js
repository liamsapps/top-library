const myLibrary = [];
// const container = document.querySelector("#container");
const books = document.querySelector("#books");
const btnAdd = document.querySelector("#add");
const myForm = document.querySelector("#my_form");
const bTitle = document.querySelector("#book_title");
const bAuthor = document.querySelector("#book_author");
const bPages = document.querySelector("#book_pages");
const bRead = document.querySelector("#book_read");
const btnSubmit = document.querySelector("#submit");
const btnCancel = document.querySelector("#cancel");

const bookInfo = document.querySelectorAll(".book_info");

function GenerateGuid() {
    if (self && self.crypto && typeof self.crypto.randomUUID === 'function') {
        const uuid = self.crypto.randomUUID();         
        return uuid;
    } else {
        console.log("self.crypto not available");
    }
}

function Book(title, author, pages, read) {
    this.id = GenerateGuid();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {        
        console.log(`ID: ${this.id}`);
        console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read": "not read yet"}`);        
    }
}

Book.prototype.toggleRead = function() {
    this.read = this.read === 'yes' ? 'no' : 'yes';
}

function addBookToLibrary(title, author, pages, read) {
    console.log('in addBookToLibrary');
    myLibrary.push(new Book(title, author, pages, read));        
}

function removeBookFromLibrary(event, bookID) {    
    const bookIndex = myLibrary.findIndex(book => book.id === bookID);
    myLibrary.splice(bookIndex, 1);
    
    loadBooks();
}

function formDisplay() {    
    if (btnAdd.disabled === false) {        
        btnAdd.disabled = true;        
        myForm.style.cssText = "display: block; visibility: visible";
        bookInfo.forEach(item => item.disabled = false);
    }
    else {
        btnAdd.disabled = false;
        myForm.style.cssText = "display: none; visibility: hidden";
        bookInfo.forEach(item => item.disabled = true);
    }    
}

function formReset() {
    bTitle.value = "";
    bAuthor.value = "";
    bPages.value = "";
    bRead.value = "";
}

function loadBooks() {
    while (books.hasChildNodes()) {
        books.removeChild(books.firstChild);
    }

    myLibrary.forEach((item) => {            
        const bookCard = document.createElement("div");
        bookCard.className = "card";
        const list = document.createElement("ul");

        // const bookID = document.createElement("li");
        // bookID.textContent = item.id;

        const bookTitle = document.createElement("li");
        bookTitle.textContent = item.title;

        const bookAuthor = document.createElement("li");
        bookAuthor.textContent = item.author;

        const bookPages = document.createElement("li");
        bookPages.textContent = item.pages;

        const bookRead = document.createElement("li");        
        bookRead.textContent = item.read;       
        
        const items = [bookTitle, bookAuthor, bookPages, bookRead];        
        items.forEach(item => list.appendChild(item));

        bookCard.appendChild(list);        

        const buttonHolder = document.createElement("div");
        buttonHolder.style.className = "book_buttons";
        
        const bookBtnDelete = document.createElement("button");
        bookBtnDelete.textContent = "Delete";        
        bookBtnDelete.addEventListener("click", (event) => removeBookFromLibrary(event, item.id));
        
        const bookBtnRead = document.createElement("button");
        bookBtnRead.textContent = "Read?";
        bookBtnRead.addEventListener("click", () => {
            item.toggleRead()
            loadBooks();
        });        
        
        buttonHolder.appendChild(bookBtnDelete);
        buttonHolder.appendChild(bookBtnRead);
        bookCard.appendChild(buttonHolder);

        books.appendChild(bookCard);        
    });
}

// test data
addBookToLibrary("Utopia", "Sir Thomas More", 359, "yes");
addBookToLibrary("Pillars of the Earth", "Ken Follett", 806, "yes");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, "yes");
addBookToLibrary("1984", "George Orwell", 328, "yes");
addBookToLibrary("Animal Farm", "George Orwell", 122, "yes");
addBookToLibrary("Brave New World", "Aldous Huxley", 268, "yes");
addBookToLibrary("A Canticle for Leibowitz", "Walter M. Miller Jr.", 320, "yes");
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, "yes");
addBookToLibrary("Moby Dick", "Herman Melville", 635, "no");
addBookToLibrary("War and Peace", "Leo Tolstoy", 1225, "no");
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 277, "no");
addBookToLibrary("Lord of the Flies", "William Golding", 224, "no");

document.addEventListener("DOMContentLoaded", (event) => {
    myForm.style.cssText = "display: none; visibility: hidden";
    // bookInfo.forEach(item => item.disabled = true);
    loadBooks();
});

myForm.addEventListener("submit", (event) => {
    // If the form is invalid, do not proceed        
    if (!myForm.checkValidity()) {        
        event.preventDefault(); // Prevent submission        
    }
    else {
        console.log("Form is valid and will be submitted.");
        addBookToLibrary(bTitle.value, bAuthor.value, bPages.value, bRead.value);
        
        event.preventDefault();

        formReset();
        formDisplay();
        loadBooks();
    }        
});

btnAdd.addEventListener("click", formDisplay);

btnCancel.addEventListener("click", () => {
    formDisplay();
    formReset();
});





