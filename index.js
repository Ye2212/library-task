const books = [
	{
		id: '1',
		title: `Apple. Эволюция компьютера`,
		author: `Владимир Невзоров`,
		img: `https://bukva.ua/img/products/449/449532_200.jpg`,
		plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
	},
	{
		id: '2',
		title: `Как объяснить ребенку информатику`,
		author: `Кэрол Вордерман`,
		img: `https://bukva.ua/img/products/480/480030_200.jpg`,
		plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
	},
	{
		id: '3',
		title: `Путь скрам-мастера. #ScrumMasterWay`,
		author: `Зузана Шохова`,
		img: `https://bukva.ua/img/products/480/480090_200.jpg`,
		plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
	},
];


if (!localStorage.getItem('books')) {
    localStorage.setItem('books', JSON.stringify(books));
}
const root = document.querySelector('#root');
root.classList.add('container')
const leftDiv = document.createElement('div');
const rightDiv = document.createElement('div');
root.append(leftDiv,rightDiv);
leftDiv.classList.add('leftDiv');
const h2 = document.createElement('h2');
h2.textContent = ('');
const ul = document.createElement('ul');
const addButton = document.createElement('button');
addButton.classList.add('btn-warning', 'btn')
addButton.textContent = 'add';
leftDiv.append(h2, ul, addButton);
rightDiv.classList.add('rightDiv');
const insertUl = document.querySelector('ul')
if (localStorage.getItem('object')) {
    createBookMarkup(JSON.parse(localStorage.getItem('object')))
}
function renderMarkup() {
    const bookMarkup = JSON.parse(localStorage.getItem("books")).map(({ title, id }) => 
    `<li id= ${id}><p class ="bookTitle">${title}</p><button class ="edit-element btn btn-primary">Edit</button><button class ="delete-element btn btn-secondary">Delete</button></li>`)
    .join('')
    insertUl.insertAdjacentHTML('beforeend', bookMarkup);
    const bookName = document.querySelectorAll('.bookTitle');
    bookName.forEach(element => element.addEventListener('click', renderPreviev));
    const buttonEdit = document.querySelectorAll(".edit-element");
    buttonEdit.forEach(button => button.addEventListener('click', onButtonEditClick))
    const buttonDelete = document.querySelectorAll(".delete-element");
    buttonDelete.forEach(button => button.addEventListener('click', onButtonDeletetClick))
}
renderMarkup();
function renderPreviev(event) {
    const { title, author, img, plot } = JSON.parse(localStorage.getItem("books")).find(element => element.title === event.currentTarget.textContent);
    function bookToFindMarkup () {
    rightDiv.innerHTML = "";
        const bookMarkup = `<h2>${title}</h2><p>${author}</p><img src=${img}><p>${plot}</p>`
        rightDiv.insertAdjacentHTML('beforeend', bookMarkup);
    }
    bookToFindMarkup();
};
function createBookMarkup(object) {
    rightDiv.innerHTML = "";
    const { title, author, img, plot } = object
    localStorage.setItem('object',JSON.stringify(object))
    return  rightDiv.insertAdjacentHTML('beforeend', `<h2>${title}</h2><p>${author}</p><img src=${img}><p>${plot}</p>`)
}
function onButtonEditClick(event) {
    const bookToEdit = event.currentTarget.parentNode;
    
    console.log("изменяет!")
    rightDiv.innerHTML = ''
    
    const localeStorageData = JSON.parse(localStorage.getItem('books'))
    console.log(localeStorageData)
    const editBook = localeStorageData.find(element => {
        if (element.id === bookToEdit.id) {
            return element
        }
    })
    rightDiv.insertAdjacentHTML('beforeend', createFormMurkup(editBook))
    console.log(bookToEdit);
    console.log(editBook)
    formFunctionality(editBook)
    const btnEditSave = document.querySelector('.btn-save')
    btnEditSave.addEventListener('click', onBtnEditSaveClick)
    function onBtnEditSaveClick(event) {
        event.preventDefault();
        console.log("сохраняет")
        localStorage.setItem('books', JSON.stringify(localeStorageData))
        insertUl.innerHTML=''
        renderMarkup()
        createBookMarkup(editBook)
        setTimeout(()=>alert('Books successfully updated'),300)
    }
};
function onButtonDeletetClick(event) {
    const bookToDelete = event.currentTarget.parentNode;
    console.log(bookToDelete);
    const localStorageData = JSON.parse(localStorage.getItem("books"));
    const bookFind = localStorageData.find(element => {
        if (element.id === bookToDelete.id) {
            return element
        }
    });
    const newData = localStorageData.filter(element => {
        if (element.id !== bookToDelete.id) {
            return element
        }
    });
    localStorage.setItem('books', JSON.stringify(newData))
    insertUl.innerHTML = ''
    renderMarkup()
    
    console.log(bookFind)
    console.log(rightDiv.children[0])
    
    if(rightDiv.children[0].textContent === bookFind.title){
        rightDiv.innerHTML = '';
    }
};
addButton.addEventListener('click', onBtnAddClick);
const inputs = document.querySelectorAll('input')
function onBtnAddClick() {
    rightDiv.innerHTML = '';
    const newBook = {
        id: `${Date.now()}`,
        title: '',
        author: '',
        img: '',
        plot:'',
    }
    console.log(newBook)
    rightDiv.insertAdjacentHTML('beforeend', createFormMurkup(newBook))
    formFunctionality(newBook)
    const btnSave = document.querySelector('.btn-save')
    
    btnSave.addEventListener('click', onBtnSaveClick);
    const inputs = document.querySelectorAll('input')
    
    function onBtnSaveClick(event) {
        event.preventDefault();
        inputs.forEach(input => {
            if (input.value === '')
                alert('Заполните все поля')
            return
        });
        if (newBook.title && newBook.author && newBook.img && newBook.plot) {
            const localStorageData = JSON.parse(localStorage.getItem("books"));
        const newLS = [...localStorageData, newBook]
        localStorage.setItem('books', JSON.stringify(newLS))
        console.log(localStorageData)
        console.log(newBook)
        insertUl.innerHTML = ''
        renderMarkup()
        createBookMarkup(newBook)
        setTimeout(() => alert('Book successfully added'),300)
        }
    }
}
function createFormMurkup(book) {
    //    localStorage.removeItem('object') 
    
    
    return `<form action="">
        <label for="title">
        Введите название книги
            <input name='title' type="text" value="${book.title}"><br>
        </label>
        <label for="author">
        Введите автора книги
            <input name='author' type="text" value="${book.author}"><br>
        </label>
        <label for="img">
        Вставьте ссылку на картинку
            <input name='img' type="text" value="${book.img}"><br>
        </label>
        <label for="plot">
        Введите описание книги
            <input name='plot' type="text" value="${book.plot}"><br>
        </label>
        <button class='btn-save' type='submit'>save</button>
    </form>`
}
function formFunctionality(book) {
    if (book === null) {
        return
    }
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => input.addEventListener('change', onInputChange));
    console.log(inputs)
    console.log(book)
    function onInputChange(event) {
        console.log(event.target)
        book[event.target.name] = event.target.value
        console.log(book)
    }
   
}