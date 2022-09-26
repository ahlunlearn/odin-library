let myLibrary = []

function Book(title, author, pages, isRead){
    this.title = title
    this.author = author
    this.pages = pages
    this.info = function(){
        return `${title} by ${author}, ${pages} pages, ${isRead?'finished':'not read yet'}`
    }
}

function addBookToLibrary(title, author, pages, isRead){
    let book = new Book(title, author, pages, isRead)
    myLibrary.push(book)
    return myLibrary
}

function displayBooks(){
    let bookItems = document.querySelector('.books-cards')
    for(let book of myLibrary){
        let bookCard = document.createElement('div')
        bookCard.classList.add('book-item')
        let title = document.createElement('h2')
        title.textContent = book.title
        bookCard.appendChild(title)
        let author = document.createElement('p')
        author.textContent = book.author
        bookCard.appendChild(author)
        let pages = document.createElement('p')
        pages.textContent = book.pages
        bookCard.appendChild(pages)
        let delbtn = document.createElement('input')
        delbtn.setAttribute('type','button')
        delbtn.setAttribute('value','delete')
        delbtn.classList.add('del-btn')
        bookCard.appendChild(delbtn)
        bookItems.appendChild(bookCard)
    }
}


document.querySelector('.addBook').addEventListener('click',()=>{
    document.querySelector('.newbook-form').classList.remove('hide')
})
document.querySelector('.cancel-btn').addEventListener('click',()=>{
    document.getElementById('newbook').reset();
    document.querySelector('.newbook-form').classList.add('hide')
})
document.querySelector('.submit-btn').addEventListener('click',()=>{
    const form = document.querySelector('form');
    const data = Object.fromEntries(new FormData(form).entries());
    console.log(data)
    document.getElementById('newbook').reset();
    document.querySelector('.newbook-form').classList.add('hide')
})

document.querySelector('.books-cards').addEventListener('click',(e)=>{
    if(e.target.classList.contains('del-btn')){
        e.target.parentNode.remove()
    }
})

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295,false)
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295,false)
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295,false)
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295,false)
displayBooks()