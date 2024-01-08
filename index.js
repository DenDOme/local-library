const myLibrary = [];
let getDisp = document.getElementById('main-disp')
const getNewBookBtn = document.getElementById('newbook');
getNewBookBtn.addEventListener('click', () => {
    addBookToLibrary()
});

class Book {
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }
}

function dispBooks(){
    cleanDisp();
    for(let i = 0 ; i < myLibrary.length ; i++){
        let group = document.createElement('div');
        group.classList.add('group')
        group.dataset.id = i;
        for(let key in myLibrary[i]){
            let newEl = document.createElement('div');
            newEl.innerHTML = myLibrary[i][key];
            group.appendChild(newEl);
        }
        let createReadBtn = document.createElement('button');
        let createDeleteBtn = document.createElement('button');
        createReadBtn.dataset.id = i;
        createDeleteBtn.dataset.id = i;
        createReadBtn.innerHTML = 'read';
        createDeleteBtn.innerHTML = 'delete';
        createReadBtn.addEventListener('click' , () => {
            let buttonid = createReadBtn;
            changeRead(buttonid)
        })
        createDeleteBtn.addEventListener('click' , () => {
            let buttonid = createDeleteBtn;
            DeleteBook(buttonid)
        })
        group.appendChild(createReadBtn);
        group.appendChild(createDeleteBtn);
        getDisp.appendChild(group);   
    }
}

function addBookToLibrary() {
    const getInputs = document.getElementsByClassName('newbook-form__input')
    const author = getInputs[0].value
    const title = getInputs[1].value
    const pages = getInputs[2].value
    const read = getInputs[3].checked;
    let newBook = new Book(author,title,pages,read);
    if(author !== '' || title !== '' || pages !== ''){
        myLibrary.push(newBook);
    }
    for(let i = 0 ; i < getInputs.length ; i++){
        getInputs[i].value = '';
    }
    dispBooks();
}

function cleanDisp(e){
    while(getDisp.firstChild){
        getDisp.removeChild(getDisp.lastChild);
    }
}
function changeRead(e){
    let bookIndex = parseInt(e.dataset.id);
    myLibrary[bookIndex].read ? myLibrary[bookIndex].read = false : myLibrary[bookIndex].read = true 
    dispBooks()
}

function DeleteBook(e) {
    let bookIndex = parseInt(e.dataset.id);
    myLibrary.splice(bookIndex, 1);
    dispBooks();
}