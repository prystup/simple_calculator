// 1.  With eval() Function (dangerous function!!!)
// 2.  With parser of math expressions
// 3.  Simple, without parentheses

// ************* №1 ******************

let buttons = document.querySelectorAll('.btn-number , .btn-operator ');
let buttonResult = document.querySelector('.btn-result');
let buttonClear = document.querySelector('.btn-clear');
let buttonAllClear = document.querySelector('.btn-all-clear');
let display = document.querySelector('.display');

let field = '';


buttons.forEach((e) => {
    e.addEventListener('click', () => {
        addValue(e.textContent);
        showField(field);
        animationPress(e);
    });
});

buttonClear.addEventListener('click', (e) => {
    field = field.substring(0, field.length - 1);
    showField(field);
});

buttonAllClear.addEventListener('click', (e) => {
    field = '';
    showField(field);
});

window.addEventListener('keydown', (k) => {
    let keyInput = k.key;
    let validInput = /^\d|\.|\+|\-|\*|\/|Backspace|Enter/;
    if (validInput.test(keyInput)) {
        keyPressed(keyInput);
    }
});

buttonResult.addEventListener('click', calculeteResult);

function keyPressed(key) {
    if (!isNaN(key) || key === '.') {
        addValue(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        addValue(key);
    } else if (key === 'Enter') {
        calculeteResult();
    } else if (key === 'Backspace') {
        field = field.substring(0, field.length - 1);
    }
    showField(field);
}

// buttons animation
function animationPress(elem) {
    elem.classList.add('button--active');
    setTimeout(() => {
        elem.classList.remove('button--active');
    }, 100);
}

function calculeteResult() {
    if (field === '' || field[0] == '*' || field[0] == '/' || field[0] == '%' || field == Infinity) {
        field = 0;
    } else if (
        field[field.length - 1] == '/' ||
        field[field.length - 1] == '*' ||
        field[field.length - 1] == '-' ||
        field[field.length - 1] == '+'
    ) {
        field = field.substring(0, field.length - 1);
    }

    let result = eval(field).toString();

    if (result.length > 10) {
        field = Number(result).toFixed(10);
    } else field = result;

    showField(field);
}

function addValue(e) {
    if (field.length < 16) {
        field += e;
    }
}

function showField(string) {
    display.textContent = field = string.substring(0, 16);
}
