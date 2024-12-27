let currentDisplay = "0";
let resultDisplay = false;
let history = JSON.parse(localStorage.getItem("calculatorHistory")) || [];

function appendToDisplay(value) {
  if (currentDisplay === "0" || resultDisplay) {
    currentDisplay = value;
  } else {
    currentDisplay += value;
  }

  resultDisplay = false;
  updateDisplay();
}

function updateDisplay() {
  const displayElement = document.getElementById("display");
  displayElement.textContent = currentDisplay;
}
function calculateResult() {
  try {
    const result = eval(currentDisplay);
    const historyEntry = `${currentDisplay} = ${result}`;
    history.push(historyEntry); // Add the calculation to history
    saveHistory(); // Save the updated history to localStorage
    currentDisplay += "\n=" + result.toString();
  } catch (error) {
    currentDisplay += "=\nError";
  }

  updateDisplay();
  updateHistory(); // Update the history dropdown with the new entry
}
function clearLastElement() {
  currentDisplay = currentDisplay.slice(0, -1);

  if (currentDisplay === "") {
    currentDisplay = "0";
  }

  updateDisplay();
}
function clearDisplay() {
  currentDisplay = "0";
  resultDisplay = false;
  updateDisplay();
}

function saveHistory() {
  localStorage.setItem("calculatorHistory", JSON.stringify(history)); // Save history to localStorage
}

// Populate the history dropdown
function updateHistory() {
  const historyDropdownMenu = document.getElementById("historyDropdownMenu");
  historyDropdownMenu.innerHTML = ""; // Clear previous history

  history.forEach((entry) => {
    const listItem = document.createElement("li");
    listItem.classList.add("dropdown-item");
    listItem.textContent = entry;

    // Reuse calculation when clicked
    listItem.onclick = function () {
      currentDisplay = entry.split(" = ")[0];
      updateDisplay();
    };

    historyDropdownMenu.appendChild(listItem);
  });
}

// Load history on page load
window.onload = function () {
  history = JSON.parse(localStorage.getItem("calculatorHistory")) || []; // Load history from localStorage
  updateHistory(); // Populate the history dropdown with loaded history
};
