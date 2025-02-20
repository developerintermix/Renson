// Theme control variables
let currentTheme = 1; // Stores the current theme (1, 2, or 3)

// Calculator state variables
let currentNumber = "0"; // Stores the currently displayed number
let previousNumber = ""; // Stores the previous number for operations
let operation = null; // Stores the selected operation (+, -, x, /)
let shouldResetScreen = false; // Flag to determine if the screen should reset

// DOM element references
const display = document.querySelector(".calculator__display");
const themeToggle = document.querySelector(".theme-switcher__toggle");
const toggleBall = document.querySelector(".theme-switcher__toggle-ball");
const numberButtons = document.querySelectorAll(".calculator__key--num");
const operatorButtons = document.querySelectorAll(".calculator__key--op");
const equalsButton = document.querySelector(".calculator__key--equals");
const resetButton = document.querySelector(".calculator__key--reset");
const deleteButton = document.querySelector(".calculator__key--del");

// Theme switching logic
// Cycles through three themes when the theme toggle is clicked
themeToggle.addEventListener("click", () => {
  currentTheme = (currentTheme % 3) + 1;
  document.body.className = `theme-${currentTheme}`;
  setTheme(currentTheme);
});

// Updates the position of the toggle ball based on the selected theme
function setTheme(theme) {
  if (theme === 1) {
    toggleBall.style.left = "13px"; // Correct left spacing
  } else if (theme === 2) {
    toggleBall.style.left = "50%";
    toggleBall.style.transform = "translateX(-50%)"; // Perfectly centered
  } else if (theme === 3) {
    toggleBall.style.left = "calc(100% - 13px)"; // Ensures equal right spacing
  }
}

// Updates the calculator display with the current number
function updateDisplay() {
  display.textContent = currentNumber;
}

// Handles number button clicks and appends digits to the display
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

// Handles operator button clicks and prepares for calculations
function handleOperation(op) {
  if (operation !== null) calculate(); // If an operation exists, calculate first
  previousNumber = currentNumber;
  operation = op;
  shouldResetScreen = true;
}

// Performs the selected mathematical operation and updates the display
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

// Resets the calculator to its initial state
function reset() {
  currentNumber = "0";
  previousNumber = "";
  operation = null;
  updateDisplay();
}

// Deletes the last entered digit or resets to 0 if only one digit remains
function deleteNumber() {
  if (currentNumber.length === 1) {
    currentNumber = "0";
  } else {
    currentNumber = currentNumber.slice(0, -1);
  }
  updateDisplay();
}

// Event listeners for number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "." && currentNumber.includes(".")) return; // Prevents multiple decimals
    appendNumber(button.textContent);
  });
});

// Event listeners for operator buttons
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => handleOperation(button.textContent));
});

// Event listener for equals button - performs calculation
equalsButton.addEventListener("click", () => {
  if (operation) calculate();
});

// Event listeners for reset and delete buttons
resetButton.addEventListener("click", reset);
deleteButton.addEventListener("click", deleteNumber);
