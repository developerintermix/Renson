let currentTheme = 1;
let currentNumber = "0";
let previousNumber = "";
let operation = null;
let shouldResetScreen = false;

const display = document.querySelector(".display");
const themeToggle = document.querySelector(".theme-toggle");
const toggleBall = document.querySelector(".toggle-ball");

// Theme switching
themeToggle.addEventListener("click", () => {
  currentTheme = (currentTheme % 3) + 1;
  document.body.className = `theme-${currentTheme}`;
  toggleBall.style.left = `${(currentTheme - 1) * 25 + 5}px`;
});

// Calculator functionality
function updateDisplay() {
  display.textContent = currentNumber;
}

function appendNumber(number) {
  if (shouldResetScreen) {
    currentNumber = "";
    shouldResetScreen = false;
  }
  if (currentNumber === "0" && number !== ".") {
    currentNumber = number;
  } else {
    currentNumber += number;
  }
  updateDisplay();
}

function handleOperation(op) {
  if (operation !== null) calculate();
  previousNumber = currentNumber;
  operation = op;
  shouldResetScreen = true;
}

function calculate() {
  let result;
  const prev = parseFloat(previousNumber);
  const current = parseFloat(currentNumber);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "x":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        alert("Cannot divide by zero!");
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentNumber = result.toString();
  operation = null;
  updateDisplay();
}

function reset() {
  currentNumber = "0";
  previousNumber = "";
  operation = null;
  updateDisplay();
}

function deleteNumber() {
  if (currentNumber.length === 1) {
    currentNumber = "0";
  } else {
    currentNumber = currentNumber.slice(0, -1);
  }
  updateDisplay();
}

// Event listeners
document.querySelectorAll(".num").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "." && currentNumber.includes(".")) return;
    appendNumber(button.textContent);
  });
});

document.querySelectorAll(".op").forEach((button) => {
  button.addEventListener("click", () => handleOperation(button.textContent));
});

document.querySelector(".equals").addEventListener("click", () => {
  if (operation) calculate();
});

document.querySelector(".reset").addEventListener("click", reset);
document.querySelector(".del").addEventListener("click", deleteNumber);