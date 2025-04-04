const outputElement = document.querySelector("#output");
const btnCopy = document.querySelector("#btnCopy");
const passwordLengthElement = document.querySelector("#length");
const numberElement = document.querySelector("#number");
const smallElement = document.querySelector("#small");
const capitalElement = document.querySelector("#capital");
const symbolElement = document.querySelector("#symbol");
const frm = document.querySelector("#frm");

btnCopy.addEventListener('click', async () => {
    const pass = outputElement.value;
    if (pass) {
        await navigator.clipboard.writeText(pass);
        alert("Copied to clipboard");
    } else {
        alert("There is no password to copy");
    }
});

function generateRandomChar(min, max) {
    const limit = max - min + 1;
    return String.fromCharCode(Math.floor(Math.random() * limit) + min);
}

function capitalValue() {
    return generateRandomChar(65, 90);
}

function smallValue() {
    return generateRandomChar(97, 122);
}

function numberValue() {
    return generateRandomChar(48, 57);
}

function symbolValue() {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const functionArray = [
    { element: smallElement, fun: smallValue },
    { element: capitalElement, fun: capitalValue },
    { element: numberElement, fun: numberValue },
    { element: symbolElement, fun: symbolValue }
];

frm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const limit = parseInt(passwordLengthElement.value, 10) || 8;
    let generatedPassword = "";
    
    const funArray = functionArray.filter(({ element }) => element.checked);
    
    if (funArray.length === 0) {
        alert("Please select at least one character type!");
        return;
    }

    for ( i = 0; i < limit; i++) { 
        const index = Math.floor(Math.random() * funArray.length);
        const char = funArray[index].fun();
        generatedPassword += char;
    }
    
    outputElement.value = generatedPassword;
});  