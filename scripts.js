let myLibrary = [
];

// Create a book element
function Book(title, author, pages, hasRead=false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;

  this.toggleHasRead = function() {
    this.hasRead = !this.hasRead;
  }
}



// Display library on index.html
function render(library) {
  // Grab CARD_LIST, delete all children
  const CARDLIST = document.querySelector('.card-list');
  while (CARDLIST.hasChildNodes()) {
    CARDLIST.removeChild(CARDLIST.lastChild);
  }

  // Re-render library and add the index to the BOOK element
  library.forEach((book, i) => {
    const BOOK_ELEMENT = bookElement(book);
    BOOK_ELEMENT.dataset.index = i.toString();

    CARDLIST.appendChild(BOOK_ELEMENT);
  });
}
// Render library on pageload
render(myLibrary);


// Push a new book to the arr and re-render library
function addBookToLibrary(book) {
  myLibrary.push(book);
  render(myLibrary);
}



// Create an element based on a book obj
function bookElement(book) {
  const CARD = document.createElement('div');
  // Add styling to show if book has been read
  if (book.hasRead) {
    CARD.classList.add('read-yes');
  } else {
    CARD.classList.add('read-no');
  }

  CARD.classList.add('card');
  const CARDBODY = document.createElement('div');
  CARDBODY.classList.add('card-body');
  CARD.appendChild(CARDBODY);
  const H1 = document.createElement('h1');
  const AUTHOR = document.createElement('p');
  H1.innerText = book.title;
  H1.classList.add('card-title');
  AUTHOR.innerText = book.author;
  AUTHOR.classList.add('card-subtitle');
  CARDBODY.appendChild(H1);
  CARDBODY.appendChild(AUTHOR);

  // Add the buttons to book CARD
  CARD.appendChild(hasReadBtn());
  CARD.appendChild(removeBookBtn());

  return CARD;
}



// Find and delete
function removeBookBtn() {
  const BUTTON = document.createElement('button');
  BUTTON.classList.add('btn', 'btn-danger', 'btn-remove-book');
  BUTTON.innerText = `x`;

  // Add event to every button created
  BUTTON.addEventListener('click', function(event) {
    const DATA_INDEX = Number(this.parentElement.dataset.index);
    myLibrary = myLibrary.filter(book => myLibrary.indexOf(book) !== DATA_INDEX);
    render(myLibrary);
  });

  return BUTTON;
}


// Toggle hasRead
function hasReadBtn() {
  const BUTTON = document.createElement('button');
  BUTTON.classList.add('btn', 'btn-primary', 'btn-has-read');
  BUTTON.innerText = 'Read?';

  BUTTON.addEventListener('click', function(event) {
    const DATA_INDEX = Number(this.parentElement.dataset.index);
    myLibrary.forEach(book => {
      if (myLibrary.indexOf(book) === DATA_INDEX) {
        book.toggleHasRead();
      }
    });
    render(myLibrary);
  })

  return BUTTON;
}


// Event Listeners
// Handle the form
const ADD_BOOK = document.querySelector('.add-book');
ADD_BOOK.addEventListener('click', function(event) {
  event.preventDefault();

  let title = document.querySelector('#title');
  let author = document.querySelector('#author');
  let pages = document.querySelector('#pages');
  let radios = document.getElementsByName('hasRead');

  title = title.value;
  author = author.value;
  pages = Number(pages.value);
  let hasRead = false;
  radios.forEach(radio => {
    if (radio.checked) {
      if (radio.value === 'true') {
        hasRead = true;
      } else {
        hasRead = false;
      }
    }
  });

  let newBook = new Book(title, author, pages, hasRead);

  addBookToLibrary(newBook);
});