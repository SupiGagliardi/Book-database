const allInputs = document.querySelectorAll('input');
const addBookBtn = document.querySelector('#addbook-btn');


const bookList = document.querySelector('.books');


let library = [];

function Book(bookName, author, genre, pages) {
    this.bookName = bookName;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = false;
};

function addBook(bookName, author, genre, pages) {
    let newBook = new Book(bookName, author, genre, pages);
    library.push(newBook);

    allInputs.forEach((input) => {
        input.value = '';
    });
};



function displayNewBook() {


    while (bookList.firstChild) {

        const lastElem = bookList.lastChild;
        bookList.removeChild(lastElem);
    };

    library.forEach((book) => {

        const div = document.createElement('div')
        bookList.appendChild(div);
        div.classList.add('book');

        const ul = document.createElement('ul');
        div.appendChild(ul);

        const nameLi = document.createElement('li');
        ul.appendChild(nameLi);
        nameLi.classList.add('bookname-li');
        nameLi.textContent = book.bookName;

        const authorLi = document.createElement('li');
        ul.appendChild(authorLi);
        authorLi.classList.add('authorname-li');
        authorLi.textContent = book.author;

        const genreLi = document.createElement('li');
        ul.appendChild(genreLi);
        genreLi.classList.add('genrename-li');
        genreLi.textContent = book.genre;

        const pagesLi = document.createElement('li');
        ul.appendChild(pagesLi);
        pagesLi.classList.add('bookpages-li');
        pagesLi.textContent = book.pages;

        const bookStateLi = document.createElement('li');
        ul.appendChild(bookStateLi);
        bookStateLi.classList.add('bookstate-li');
        if (book.read === false) {
            bookStateLi.innerHTML = '<img src="icons/unread-icon.svg" alt="unread icon">'

        } else {
            bookStateLi.innerHTML = '<img src="icons/read-icon.svg" alt="read icon">'

        }

        const deleteLi = document.createElement('li');
        ul.appendChild(deleteLi)
        deleteLi.classList.add('deletebtn-li');
        deleteLi.setAttribute('data-index', `${library.indexOf(book)}`);
        deleteLi.innerHTML = `<img src="icons/delete.svg" alt="delete icon">`

        const bookStates = document.querySelectorAll('.bookstate-li');

        bookStateLi.addEventListener('click', () => {

            if (book.read === false) {
                book.read = true;
                bookStateLi.innerHTML = '<img src="icons/read-icon.svg" alt="read icon">'

            } else if (book.read === true) {
                book.read = false;
                bookStateLi.innerHTML = '<img src="icons/unread-icon.svg" alt="unread icon">'
            }
        })
    });

    const deleteLis = document.querySelectorAll('.deletebtn-li');

    deleteLis.forEach(li => {
        li.addEventListener('click', (e) => {

            let attribute = li.getAttribute('data-index')
            library.splice(attribute, 1);
            displayNewBook();
        })
    });

};



addBookBtn.addEventListener('click', () => {

    const bookName = document.querySelector('#book-name');
    const bookAuthor = document.querySelector('#book-author');
    const bookGenre = document.querySelector('#book-genre');
    const bookPages = document.querySelector('#book-pages');


    if (bookName.value === '' || bookAuthor.value === '' || bookGenre.value === '' || bookPages.value === '') {
        return
    }

    addBook(bookName.value, bookAuthor.value, bookGenre.value, bookPages.value);
    displayNewBook();
});




