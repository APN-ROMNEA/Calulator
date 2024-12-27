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
    history.push(historyEntry);
    saveHistory();
    currentDisplay += "\n=" + result.toString();
  } catch (error) {
    currentDisplay += "=\nError";
  }

  updateDisplay();
  updateHistory();
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
  localStorage.setItem("calculatorHistory", JSON.stringify(history));
}

function updateHistory() {
  const historyDropdownMenu = document.getElementById("historyDropdownMenu");
  historyDropdownMenu.innerHTML = "";
  history.forEach((entry) => {
    const listItem = document.createElement("li");
    listItem.classList.add("dropdown-item");
    listItem.textContent = entry;

    listItem.onclick = function () {
      currentDisplay = entry.split(" = ")[0];
      updateDisplay();
    };

    historyDropdownMenu.appendChild(listItem);
  });
}

window.onload = function () {
  history = JSON.parse(localStorage.getItem("calculatorHistory")) || [];
  updateHistory();
};
