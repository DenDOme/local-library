class Library {
  constructor() {
    this.storage = [];
    this.initialBtns();
  }

  cleanDisp(disp) {
    while (disp.firstChild) {
      disp.removeChild(disp.lastChild);
    }
  }

  dispBooks() {
    const getDisp = document.getElementById('main-disp');
    this.cleanDisp(getDisp);
    for (let i = 0; i < this.storage.length; i++) {
      const group = document.createElement('div');
      group.classList.add('group');
      group.dataset.id = i;
      for (const key in this.storage[i]) {
        const newEl = document.createElement('div');
        newEl.innerHTML = this.storage[i][key];
        group.appendChild(newEl);
      }
      const createReadBtn = document.createElement('button');
      const createDeleteBtn = document.createElement('button');
      createReadBtn.dataset.id = i;
      createDeleteBtn.dataset.id = i;
      createReadBtn.innerHTML = 'read';
      createDeleteBtn.innerHTML = 'delete';
      createReadBtn.addEventListener('click', () => {
        const buttonid = createReadBtn;
        this._changeRead(buttonid);
      });
      createDeleteBtn.addEventListener('click', () => {
        const buttonid = createDeleteBtn;
        this._DeleteBook(buttonid);
      });
      group.appendChild(createReadBtn);
      group.appendChild(createDeleteBtn);
      getDisp.appendChild(group);
    }
  }

  initialBtns() {
    document.getElementById('newbook').addEventListener('click', () => {
      const getInputs = document.getElementsByClassName('newbook-form__input');
      const author = getInputs[0].value;
      const title = getInputs[1].value;
      const pages = getInputs[2].value;
      const read = getInputs[3].checked;
      const newBook = { author, title, pages, read };
      if (author !== '' && title !== '' && pages !== '') {
        this.storage.push(newBook);
      }
      for (let i = 0; i < getInputs.length; i++) {
        getInputs[i].value = '';
      }
      this.dispBooks();
    });
  }

  _changeRead(e) {
    const bookIndex = parseInt(e.dataset.id);
    this.storage[bookIndex].read
      ? (this.storage[bookIndex].read = false)
      : (this.storage[bookIndex].read = true);
    this.dispBooks();
  }

  _DeleteBook(e) {
    const bookIndex = parseInt(e.dataset.id);
    this.storage.splice(bookIndex, 1);
    this.dispBooks();
  }
}

new Library();
