let myLibrary = []

function Book(title, author, pages, isRead){
    this.title = title
    this.author = author
    this.pages = pages
    this.id = myLibrary.length
    this.isRead = isRead
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
    bookItems.innerHTML = ''
    for(let book of myLibrary){
        if (!book){
            continue
        }
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
        
        let readbtn = document.createElement('input')
        readbtn.setAttribute('type','button')
        readbtn.setAttribute('value',(book.isRead?'read':'not read'))
        readbtn.classList.add('read-btn')
        if (book.isRead) { readbtn.classList.toggle('read')}
        bookCard.appendChild(readbtn)

        let delbtn = document.createElement('input')
        delbtn.setAttribute('type','button')
        delbtn.setAttribute('value','delete')
        delbtn.classList.add('del-btn')
        bookCard.appendChild(delbtn)
        
        bookCard.setAttribute('book-id',book.id)
        
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
document.querySelector('.submit-btn').addEventListener('click',(e)=>{
    e.preventDefault()
    const form = document.querySelector('form');
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.title && data.pages){addBookToLibrary(data.title, data.author, data.pages, (data.isread || false))}
    document.getElementById('newbook').reset();
    document.querySelector('.newbook-form').classList.add('hide')
    displayBooks()
})

document.querySelector('.books-cards').addEventListener('click',(e)=>{
    if(e.target.classList.contains('del-btn')){
        let id = e.target.parentNode.getAttribute('book-id')
        myLibrary[Number(id)] = null
        e.target.parentNode.remove()
    } else if(e.target.classList.contains('read-btn')){
        e.target.classList.toggle('read')
        let id = e.target.parentNode.getAttribute('book-id')
        myLibrary[Number(id)].isRead = !myLibrary[Number(id)].isRead
        e.target.setAttribute('value',(myLibrary[Number(id)].isRead?'read':'not read'))
    }
})

// addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295,false)
// addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295,false)
// addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295,false)
// addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295,false)
displayBooks()