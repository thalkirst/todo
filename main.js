// basic initialization steps //

let pendingItems = 0;
let completedItems = 0;
const addButton = document.querySelector('.add__button');
addButton.addEventListener('click', newListItem);

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
        pending.textContent = `You have ${pendingItems} pending item(s).`
    }
}
updatePending();

// function to keep track and display the number of completed tasks //

const updateCompleted = () => {
    const completed = document.querySelector('.completed__tasks');
    if (completedItems === 0) {
    }
    else {
        completed.textContent = `You have ${completedItems} completed item(s).`
    }
}
updateCompleted();

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
}

// remove a todo list item //

function removeItem(li) {
    li.removeChild(li.lastChild);
    document.querySelector(".list").removeChild(li);
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

function listenerGenerator(li, checkBox, closeButton) {

    li.addEventListener('mouseover', () => {
        closeButton.classList.add('show');
    });
    li.addEventListener('mouseout', () => {
        closeButton.classList.remove('show');
    });

    closeButton.addEventListener('click', () => {
        removeItem(li);
    });

    checkBox.addEventListener('click', () => {
        removeItem(li);
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

    itemGenerator(li, checkBox, text, closeButton);
    listenerGenerator(li, checkBox, closeButton);

    pendingItems++
    updatePending();

    document.querySelector(".input__field").value = "";
}

