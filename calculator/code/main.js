document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("res");
    let currentInput = "";
    let operator = "";
    let firstOperand = "";
    let shouldResetScreen = false;

    const updateDisplay = () => {
        display.textContent = currentInput || "0";
    };

    const appendNumber = (num) => {
        if (shouldResetScreen) {
            currentInput = "";
            shouldResetScreen = false;
        }
        currentInput += num;
        updateDisplay();
    };

    const setOperator = (op) => {
        if (currentInput === "") return;
        if (firstOperand !== "") calculate();
        operator = op;
        firstOperand = currentInput;
        currentInput = "";
    };

    const calculate = () => {
        if (firstOperand === "" || operator === "" || currentInput === "") return;
        let result;
        const a = parseFloat(firstOperand);
        const b = parseFloat(currentInput);

        switch (operator) {
            case "+":
                result = a + b;
                break;
            case "-":
                result = a - b;
                break;
            case "x":
                result = a * b;
                break;
            case "/":
                result = b !== 0 ? a / b : "Error";
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = "";
        firstOperand = "";
        shouldResetScreen = true;
        updateDisplay();
    };

    const resetCalculator = () => {
        currentInput = "";
        firstOperand = "";
        operator = "";
        shouldResetScreen = false;
        updateDisplay();
    };

    const deleteLast = () => {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    };

    document.getElementById("bt0").addEventListener("click", () => appendNumber("0"));
    document.getElementById("bt1").addEventListener("click", () => appendNumber("1"));
    document.getElementById("bt2").addEventListener("click", () => appendNumber("2"));
    document.getElementById("bt3").addEventListener("click", () => appendNumber("3"));
    document.getElementById("bt4").addEventListener("click", () => appendNumber("4"));
    document.getElementById("bt5").addEventListener("click", () => appendNumber("5"));
    document.getElementById("bt6").addEventListener("click", () => appendNumber("6"));
    document.getElementById("bt7").addEventListener("click", () => appendNumber("7"));
    document.getElementById("bt8").addEventListener("click", () => appendNumber("8"));
    document.getElementById("bt9").addEventListener("click", () => appendNumber("9"));
    document.getElementById("btpunto").addEventListener("click", () => {
        if (!currentInput.includes(".")) appendNumber(".");
    });

    document.getElementById("btplus").addEventListener("click", () => setOperator("+"));
    document.getElementById("btmenos").addEventListener("click", () => setOperator("-"));
    document.getElementById("btequis").addEventListener("click", () => setOperator("x"));
    document.getElementById("btbarra").addEventListener("click", () => setOperator("/"));
    document.getElementById("equal").addEventListener("click", calculate);
    document.getElementById("reset").addEventListener("click", resetCalculator);
    document.getElementById("del").addEventListener("click", deleteLast);

    updateDisplay();
});
