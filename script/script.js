const library = {
    books : []
};

function getFormObject(formData){
    let formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
      });
    return formObject;
}


const form = document.querySelector("#form")
const div = document.querySelector(".book-div")
let bookId = 0;

class Book {
    constructor(author, title, isRead, id) {
      this.author = author;
      this.title = title;
      this.isRead = isRead;
      this.id = id;
  }
}


function addTitle(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = getFormObject(formData);

    if(formObject["author"] == "" || formObject["title"] == "") {
        return;
    }
    const content = document.createElement("div");
    content.classList.add("book-display");
    content.innerHTML = `
        <div class="book-info-base">
            Title:
        </div>
        <div class="book-info-element">
            ${formObject["title"]}
        </div>
        <div class="book-info-base">
            Author:
        </div>
        <div class="book-info-element">
            ${formObject["author"]}
        </div>
        <div>
            <button type="button" class="delete-button" id="delete-button-${bookId}">Delete</button>
            <button type="button" class="read-button" id="read-button-${bookId}">Toggle Read</button>
        </div>
        `;

    div.appendChild(content);

    const deleteButton = document.querySelector(`#delete-button-${bookId}`);
    deleteButton.addEventListener("click", deleteTitle);

    const readButton = document.querySelector(`#read-button-${bookId}`);
    readButton.addEventListener("click", setTitleToRead)

    formObject.id = bookId;
    formObject.isRead = false;

    library.books.push(formObject);

    bookId++;
    form.reset()
}

function populateTitle(book) {

    if(book["author"] == "" || book["title"] == "") {
        return;
    }

    let currentBookId = book.id

    const content = document.createElement("div");

    if(book.isRead){
        content.classList.add("book-display");
    } else {
        content.classList.add("book-display-read")
    }

    content.innerHTML = `
        <div class="book-info-base">
            Title:
        </div>
        <div class="book-info-element">
            ${book["title"]}
        </div>
        <div class="book-info-base">
            Author:
        </div>
        <div class="book-info-element">
            ${book["author"]}
        </div>
        <div>
            <button type="button" class="delete-button" id="delete-button-${currentBookId}">Delete</button>
            <button type="button" class="read-button" id="read-button-${currentBookId}">Toggle Read</button>
        </div>
        `;

    div.appendChild(content);

    const deleteButton = document.querySelector(`#delete-button-${currentBookId}`);
    deleteButton.addEventListener("click", deleteTitle);

    const readButton = document.querySelector(`#read-button-${currentBookId}`);
    readButton.addEventListener("click", setTitleToRead)

    bookId = currentBookId + 1
    form.reset()
}



function setTitleToRead(event) {
    const parent = event.target.parentNode.parentNode;
    parent.classList.toggle("book-display-read");
    parent.classList.toggle("book-display");
}



function deleteTitle(event){
    const element = event.target;
    const parent = element.parentNode.parentNode;
    parent.remove();
}


form.addEventListener("submit", addTitle);

function displayTitles(library){
    library.books.forEach(book => populateTitle(book));
}

const book1 = new Book("Jimmy John", "How to eat rocks", false, 1);
const book2 = new Book("Johnagle Books", "DIY Sand tutorial", true, 2);


library.books.push(book1)
library.books.push(book2)


displayTitles(library);