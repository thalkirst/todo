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

let pendingItems = 0;
let completedItems = 0;

const updatePending = () => {
    const pending = document.querySelector('.pending__items');
    if (pendingItems === 0) {
        pending.textContent = `Relax! You have nothing to do now.`
    }
    else {
        pending.textContent = `You have ${pendingItems} pending items.`
    }
}
updatePending();


const addButton = document.querySelector('.add__button');
addButton.addEventListener('click', newListItem);

function newListItem() {
    const li = document.createElement("li");
    const checkBox = document.createElement("input");
    const closeButton = document.createElement("i");
    checkBox.type = 'checkbox';
    closeButton.classList.add('close__button', 'fa', 'fa-trash');
    checkBox.classList.add('list__checkbox');
    let inputValue = document.querySelector(".input__field").value;
    if (inputValue === '') {
        inputValue = document.querySelector(".input__field").placeholder;
    }
    const text = document.createElement('span');
    text.textContent = inputValue;
    text.classList.add('list__text');
    li.appendChild(checkBox);
    li.appendChild(text);
    li.appendChild(closeButton);
    li.addEventListener('mouseover', () => {
        closeButton.classList.add('show');
    });
    li.addEventListener('mouseout', () => {
        closeButton.classList.remove('show');
    });

    document.querySelector(".list").appendChild(li);
    setTimeout(function () {
        li.classList.add("show");
    }, 10);
    pendingItems++
    updatePending();
    closeButton.addEventListener('click', () => {
        document.querySelector(".list").removeChild(li);
        pendingItems = pendingItems - 1;
        updatePending();
    });
    document.querySelector(".input__field").value = "";
}

