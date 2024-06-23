const library = {
    books : []
};

function getFormObject(formData){
    let book = {};
    formData.forEach((value, key) => {
        book[key] = value;
      });
    return book;
}


const form = document.querySelector("#form");
const div = document.querySelector(".book-div");
let bookId = 0;

class Book {
    constructor(author, title, isRead, id, pages) {
      this.author = author;
      this.title = title;
      this.isRead = isRead;
      this.id = id;
      this.pages = pages;
  }
}


function populateTitle(book) {

    if(book["author"] == "" || book["title"] == "") {
        return;
    }

    let currentBookId = book.id;
    const bookDisplay = document.createElement('div');

    const content = document.createElement("div");
    let readStatus = "Read";
    let readClass=  "read";

    if(!book.isRead){
        bookDisplay.classList.add("book-display");
        readStatus = "Not Read";
        readClass = "not-read";
    } else {
        bookDisplay.classList.add("book-display-read");
    }

    const base1 = document.createElement('div');
    const base2 = document.createElement('div');
    const base3 = document.createElement('div');
    const element1 = document.createElement('div');
    const element2 = document.createElement('div');
    const element3 = document.createElement('div');
    
    base1.classList.add("book-info-base");
    base2.classList.add("book-info-base");
    base3.classList.add("book-info-base");

    element1.classList.add("book-info-element");
    element2.classList.add("book-info-element");
    element3.classList.add("book-info-element");

    base1.textContent = "Title:";
    base2.textContent = "Author:";
    base3.textContent = "Pages:";

    element1.textContent = book["title"];
    element2.textContent = book["author"];
    element3.textContent = book["pages"];

    const readDiv = document.createElement('div');
    readDiv.classList.add(readClass);
    readDiv.textContent = readStatus;

    const deleteButton = document.createElement('button');
    const readButton = document.createElement('button');

    deleteButton.id = `delete-button-${currentBookId}`;
    readButton.id = `read-button-${currentBookId}`;

    deleteButton.classList.add("delete-button");
    readButton.classList.add("read-button");

    deleteButton.textContent = " Delete ";
    readButton.textContent = " Toggle Read ";

    const buttonDiv = document.createElement('div');

    buttonDiv.appendChild(deleteButton);
    buttonDiv.appendChild(readButton);


    bookDisplay.appendChild(base1);
    bookDisplay.appendChild(element1);
    bookDisplay.appendChild(base2);
    bookDisplay.appendChild(element2);
    bookDisplay.appendChild(base3);
    bookDisplay.appendChild(element3)
    bookDisplay.appendChild(readDiv);
    bookDisplay.appendChild(buttonDiv);

    div.append(bookDisplay);
    deleteButton.addEventListener("click", deleteTitle);
    readButton.addEventListener("click", setTitleToRead);

    bookId = currentBookId + 1;
    form.reset();
}

function addTitle(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = getFormObject(formData);
    console.log(formObject)

    const isRead = formObject.isRead == "on" ? true : false;

    const book = new Book(formObject.author, formObject.title, isRead, bookId, formObject.pages)
    library.books.push(book);

    bookId++;
    displayTitles(library);
}

function setTitleToRead(event) {
    const myBookId = parseInt(event.target.id.match(/\d+$/)[0], 10);
    const bookRefIndex = library.books.findIndex(book => book.id == myBookId)

    if(library.books[bookRefIndex].isRead){
        library.books[bookRefIndex].isRead = false;
    } else {
        library.books[bookRefIndex].isRead = true;
    }
    displayTitles(library);
}



function deleteTitle(event){
    const myBookId = parseInt(event.target.id.match(/\d+$/)[0], 10);
    library.books = library.books.filter(filterBook => !(filterBook.id == myBookId));
    displayTitles(library);
}

form.addEventListener("submit", addTitle);

function displayTitles(library){
    div.innerHTML = ''
    library.books.forEach(book => populateTitle(book));
}

function displayForm(event){
    const submitFormDiv = document.querySelector(".submit-form")
    submitFormDiv.innerHTML = ''
}


const book1 = new Book("John Doe", "Example Book", false, 1, 25);

library.books.push(book1);
library.books.push(book2);

displayTitles(library);