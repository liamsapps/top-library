const myLibrary = [];
const container = document.querySelector("#container");

function GenerateGuid() {
    if (self && self.crypto && typeof self.crypto.randomUUID === 'function') {
        const uuid = self.crypto.randomUUID(); 
        console.log(uuid);
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

function addBookToLibrary(title, author, pages, read) {
    console.log('in addBookToLibrary');
    myLibrary.push(new Book(title, author, pages, read));    
}

addBookToLibrary("Utopia", "Sir Thomas More", 359, true);
addBookToLibrary("Pillars of the Earth", "Ken Follett", 806, true);
addBookToLibrary("Utopia", "Sir Thomas More", 359, true);
addBookToLibrary("Pillars of the Earth", "Ken Follett", 806, true);
addBookToLibrary("Utopia", "Sir Thomas More", 359, true);
addBookToLibrary("Pillars of the Earth", "Ken Follett", 806, true);
addBookToLibrary("Utopia", "Sir Thomas More", 359, true);
addBookToLibrary("Pillars of the Earth", "Ken Follett", 806, true);
addBookToLibrary("Utopia", "Sir Thomas More", 359, true);
addBookToLibrary("Pillars of the Earth", "Ken Follett", 806, true);
addBookToLibrary("Utopia", "Sir Thomas More", 359, true);
addBookToLibrary("Pillars of the Earth", "Ken Follett", 806, true);

myLibrary.forEach((item) => {            
    console.log('start of myLibrary.forEach');

    const bookCard = document.createElement("div");
    bookCard.className = "card";
    const list = document.createElement("ul");

    const bookID = document.createElement("li");
    bookID.textContent = item.id;

    const bookTitle = document.createElement("li");
    bookTitle.textContent = item.title;

    const bookAuthor = document.createElement("li");
    bookAuthor.textContent = item.author;

    const bookPages = document.createElement("li");
    bookPages.textContent = item.pages;

    const bookRead = document.createElement("li");
    bookRead.textContent = item.read;

    console.log(item.id);
    console.log(item.title);
    console.log(item.author);
    console.log(item.pages);
    console.log(item.read);

    const items = [bookID, bookTitle, bookAuthor, bookPages, bookRead];
    console.log(items[0]);
    items.forEach(item => list.appendChild(item));

    bookCard.appendChild(list);
    container.appendChild(bookCard);

    console.log('end of myLibrary.forEach');
});