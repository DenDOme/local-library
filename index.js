class Library {
    constructor(){
        this.storage = [];
        this.initialBtns()       
    }

    cleanDisp(disp){
        while(disp.firstChild){
            disp.removeChild(disp.lastChild);
        }
    }

    dispBooks(){
        let getDisp = document.getElementById('main-disp')
        this.cleanDisp(getDisp)
        for(let i = 0 ; i < this.storage.length ; i++){
            let group = document.createElement('div');
            group.classList.add('group')
            group.dataset.id = i;
            for(let key in this.storage[i]){
                let newEl = document.createElement('div');
                newEl.innerHTML = this.storage[i][key];
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
                this._changeRead(buttonid)
            })
            createDeleteBtn.addEventListener('click' , () => {
                let buttonid = createDeleteBtn;
                this._DeleteBook(buttonid)
            })
            group.appendChild(createReadBtn);
            group.appendChild(createDeleteBtn);
            getDisp.appendChild(group);   
        }
    }
    initialBtns(){
        document.getElementById('newbook').addEventListener('click', () => {
            const getInputs = document.getElementsByClassName('newbook-form__input')
            const author = getInputs[0].value
            const title = getInputs[1].value
            const pages = getInputs[2].value
            const read = getInputs[3].checked;
            let newBook = {author,title,pages,read};
            if(author !== '' || title !== '' || pages !== ''){
                this.storage.push(newBook)
            }
            for(let i = 0 ; i < getInputs.length ; i++){
                getInputs[i].value = '';
            }
            this.dispBooks();
            });
    }
    _changeRead(e){
        let bookIndex = parseInt(e.dataset.id);
        this.storage[bookIndex].read ? this.storage[bookIndex].read = false : this.storage[bookIndex].read = true 
        this.dispBooks()
    }
        
    _DeleteBook(e) {
        let bookIndex = parseInt(e.dataset.id);
        this.storage.splice(bookIndex, 1);
        this.dispBooks();
    }
}

new Library();