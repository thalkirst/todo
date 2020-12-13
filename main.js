// basic initialization steps //

let pendingItems = 0;
let completedItems = 0;
const showButton = document.querySelector('.show__button');
document.querySelector('.add__button').addEventListener('click', newListItem);
document.querySelector('.delete__button').addEventListener('click', deleteAll);
showButton.addEventListener('click', showComplete);
document.querySelector('.clear__button').addEventListener('click', clearAll);

// adding date and day of week to header //

const addDate = () => {
    const today = new Date();
    const dayDisplayed = document.querySelector('.current__day');
    const dateDisplayed = document.querySelector('.current__date');
    let weekday = today.toLocaleString('en-US', { weekday: "long" })
    let date = today.toLocaleDateString('en-US');
    dayDisplayed.textContent = weekday;
    dateDisplayed.textContent = date;
}

addDate()

// function to keep track and display the number of incomplete tasks //

const updatePending = () => {
    const pending = document.querySelector('.pending__items');
    if (pendingItems === 0) {
        pending.textContent = `Relax! You have nothing to do now.`
    }
    else {
        pending.textContent = `You have ${pendingItems} pending tasks(s).`
    }
}


// function to keep track and display the number of completed tasks //

const updateCompleted = () => {
    const completed = document.querySelector('.completed__tasks');
    completed.textContent = `You have ${completedItems} completed tasks(s).`
}

// check storage and add items if necessary

const checkStorage = () => {
    let tasks = [];
    Object.keys(localStorage).forEach(function(key) {
        tasks.push(key);
     });
    if (tasks !== []) {
        for (let i=0; i<tasks.length; i++) {
            const li = document.createElement("li");
            const checkBox = document.createElement("input");
            const closeButton = document.createElement("i");
            const text = document.createElement('span');
            text.textContent = tasks[i];
            text.classList.add('list__text');
            checkBox.type = 'checkbox';
            checkBox.classList.add('list__checkbox');
            closeButton.classList.add('close__button', 'fa', 'fa-trash');
            itemGenerator(li, checkBox, text, closeButton);
            listenerGenerator(li, checkBox, text, closeButton);
            pendingItems++
            updatePending();
        }
    }
    updatePending();
}

checkStorage();


// todo list item text generator //

function textGenerator() {
    const text = document.createElement('span');
    let inputValue = document.querySelector(".input__field").value;
    if (inputValue === '') {
        inputValue = document.querySelector(".input__field").placeholder;
    }
    text.textContent = inputValue;
    text.classList.add('list__text');
    return text;
}

// complete list item generator //

function itemGenerator(li, checkBox, text, closeButton) {
    li.appendChild(checkBox);
    li.appendChild(text);
    li.appendChild(closeButton);
    document.querySelector(".list").appendChild(li);
    setTimeout(function () {
        li.classList.add("show");
    }, 10);
    localStorage.setItem(text.textContent, text);
}

// prevent the creation of completely identical tasks //

function notDuplicate(text) {
    const list = document.querySelector(".list").children;
    for (let i = 0; i < list.length; i++) {
        if (text.textContent === (list[i].children[1]).textContent) {
            document.querySelector(".error").textContent = 'Identical tasks are not allowed'
            return false;
        }
    }
    return true;
}


// remove a todo list item //

function removeItem(li, text) {
    document.querySelector(".error").textContent = ''
    li.removeChild(li.lastChild);
    document.querySelector(".list").removeChild(li);
    localStorage.removeItem(text.textContent);
    pendingItems = pendingItems - 1;
    updatePending();
}

// adding a completed item //

function addCompletedItem(li) {
    completedItems++;
    updateCompleted();
    document.querySelector(".list__completed").appendChild(li);
}


// adding event listeners to list items //

function listenerGenerator(li, checkBox, text, closeButton) {

    li.addEventListener('mouseover', () => {
        closeButton.classList.add('show');
    });
    li.addEventListener('mouseout', () => {
        closeButton.classList.remove('show');
    });

    closeButton.addEventListener('click', () => {
        removeItem(li, text);
    });

    checkBox.addEventListener('click', () => {
        removeItem(li, text);
        addCompletedItem(li);
    });

}

// creating a list item from the task specified //

function newListItem() {

    const li = document.createElement("li");
    const checkBox = document.createElement("input");
    const closeButton = document.createElement("i");
    checkBox.type = 'checkbox';
    checkBox.classList.add('list__checkbox');
    closeButton.classList.add('close__button', 'fa', 'fa-trash');
    let text = textGenerator();
    document.querySelector(".error").textContent = ''
    if (notDuplicate(text)) {
        itemGenerator(li, checkBox, text, closeButton);
        listenerGenerator(li, checkBox, text, closeButton);

        pendingItems++
        updatePending();
    }
    document.querySelector(".input__field").value = "";
}

// delete all incomplete items //

function deleteAll() {
    document.querySelector(".error").textContent = ''
    const list1 = document.querySelector(".list");
    while (list1.firstChild) {
        list1.removeChild(list1.lastChild);
    }
    localStorage.clear();
    pendingItems = 0;
    updatePending();

}

// delete every item and reset show/hide button //

function clearAll() {
    deleteAll();
    const list1 = document.querySelector(".list__completed");
    while (list1.firstChild) {
        list1.removeChild(list1.lastChild);
    }
    completedItems = 0;
    showComplete();

}

// show/hide button functionality ///

function showComplete() {
    const completed = document.querySelector('.completed__tasks');
    const list = document.querySelector(".list__completed");
    if (showButton.textContent === 'Show Complete') {
        if (completedItems > 0) {
            completed.classList.add('show');
            list.classList.add('show');
            showButton.textContent = 'Hide Complete';
        }
    } else {
        completed.classList.remove('show');
        list.classList.remove('show');
        showButton.textContent = 'Show Complete';
    }
}


