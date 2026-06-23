//query relavnet html elements
const numberBtns = document.querySelectorAll(".number-button");
const operatorBtns = document.querySelectorAll(".operator-button");
const equalsBtn = document.querySelector("#equals");
const clearBtn = document.querySelector("#clear-button")
const display = document.querySelector("#display");

//calculation vars
let a = "";
let b = "";
let operator = "";
let textToDisplay = "";

numberBtns.forEach(numberBtn =>
{
    numberBtn.addEventListener("click", () =>
    {
        handleNumberButtonClick(numberBtn);
        updateDisplay();
    });
});

operatorBtns.forEach(operatorBtn =>
{
    operatorBtn.addEventListener("click", () =>
    {
        handleOperatorClick(operatorBtn);
        updateDisplay();
    });
});

equalsBtn.addEventListener("click", () => calculateAndDisplay());
clearBtn.addEventListener("click", reset);


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
//basic math functions
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
    display.textContent = a + operator + b;
}

function handleNumberButtonClick(numberBtn)
{
    if (operator)
    {
        b += numberBtn.textContent;
    }
    else
    {
        a += numberBtn.textContent;
    }

    updateDisplay();
}

function handleOperatorClick(operatorBtn)
{
    if (!b)
    {
        operator = operatorBtn.textContent;
        updateDisplay();
    }
    else
    {
        calculateAndDisplay(operatorBtn.textContent);
    }

}

function calculateAndDisplay(optionalOperator = "")
{
    let result = Math.round(operate(a, b, operator));
    reset()
    a = result;
    operator = optionalOperator;
    updateDisplay();
}

function reset()
{
    a = "";
    b = "";
    operator = "";
    updateDisplay();
}
