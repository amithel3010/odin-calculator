const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector("#equals");
const clearBtn = document.querySelector("#clear-button")
const backspaceBtn = document.querySelector("#backspace");
const display = document.querySelector("#display");

let a = "";
let b = "";
let operator = "";
let textToDisplay = "";
let hasResult = false;

//keyboard support
document.addEventListener("keydown", (event) =>
{
    const numbers = "0,1,2,3,4,5,6,7,8,9".split(",");
    const operators = "+,-,*,/".split(",");

    let keyPressed = event.key;
    
    let isNumber = numbers.includes(keyPressed);
    let isOperator = operators.includes(keyPressed);

    if (isNumber)
    {
        handleNumberButtonClick(keyPressed);
    }
    else if(isOperator)
    {
        handleOperatorClick(keyPressed)
    }
    else if (keyPressed === "Backspace")
    {
        handleBackspaceClick();
    }
    else if(keyPressed === "=" || keyPressed === "Enter")
    {
        calculateAndDisplay();
    }
    else{
        console.log("unsupported key pressed: "+ event.key);
    }
})

numberBtns.forEach(numberBtn =>
{
    numberBtn.addEventListener("click", () =>
    {
        handleNumberButtonClick(numberBtn.textContent);
        updateDisplay();
    });
});

operatorBtns.forEach(operatorBtn =>
{
    operatorBtn.addEventListener("click", () =>
    {
        handleOperatorClick(operatorBtn.textContent);
        updateDisplay();
    });
});

clearBtn.addEventListener("click", () =>
{
    reset();
    updateDisplay()
});

equalsBtn.addEventListener("click", () => calculateAndDisplay());

backspaceBtn.addEventListener("click", () => handleBackspaceClick());

//end of runtime code

function operate(a, b, operator)
{
    //convert a and b to numbers
    a = +a;
    b = +b;

    if (!operator)
    {
        return a;
    }

    switch (operator)
    {
        case "+":
            return add(a, b);
            break;

        case "-":
            return subtract(a, b);
            break;

        case "*":
            return multiply(a, b);
            break;

        case "/":
            return divide(a, b);
            break;

        default:
            console.log("unsupported operator used")

    }
}

function add(a, b)
{
    return a + b;
}

function subtract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a * b;
}

function divide(a, b)
{
    if (b === 0)
    {
        alert("can't divide by 0!");
        return a;
    }
    else
        return a / b;
}

function updateDisplay()
{
    if (!a)
    {
        display.textContent = "0";
    }
    else
    {
        display.textContent = a + operator + b;
    }
}

function handleNumberButtonClick(numberAsString)
{
    if (operator)
    {
        b += numberAsString;
    }
    else
    {
        if (hasResult)
        {
            reset();
        }
        a += numberAsString;
    }

    updateDisplay();
}

function handleOperatorClick(operatorAsString)
{
    if (!b)
    {
        operator = operatorAsString;
        updateDisplay();
    }
    else
    {
        calculateAndDisplay(operatorAsString);
    }

}

function handleBackspaceClick()
{
    if (hasResult)
    {
        reset();
    }
    else if (b)
    {
        b = deleteLastChar(b);
    }
    else if (operator)
    {
        operator = "";
    }
    else if (a)
    {
        a = deleteLastChar(a);
    }

    updateDisplay();
}

function calculateAndDisplay(optionalOperator = "")
{
    let result = Math.round(operate(a, b, operator));
    reset()
    a = result;
    operator = optionalOperator;
    hasResult = true;
    updateDisplay();
}

function reset()
{
    a = "";
    b = "";
    operator = "";
    hasResult = false;
}

function deleteLastChar(string)
{
    return string.slice(0, -1);
}