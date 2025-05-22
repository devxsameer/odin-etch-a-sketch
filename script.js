// Constant Variables
const container = document.querySelector(".container");
const changeBtn = document.querySelector(".change-btn");
const colorPicker = document.querySelector("#color-picker");
const clearBtn = document.querySelector(".clear-btn");
const radioBtns = document.querySelectorAll(".radio");

const DEFAULT_COLOR = "#2d3436";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;
// Variables
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let mouseDown = false;
// Functions
const setCurrentColor = (newColor) => (currentColor = newColor);
const setCurrentSize = (newSize) => (currentSize = newSize);
const createGrid = (size) => {
  clearGrid();
  for (let i = 0; i < size * size; i++) {
    const item = document.createElement("div");
    item.classList.add("item");
    item.style.width = `${80 / size}vw`;
    item.style.height = `${80 / size}vh`;
    item.addEventListener("mouseover", changeColor);
    item.addEventListener("mousedown", changeColor);
    container.appendChild(item);
  }
};
function getCurrentColor() {
  if (currentMode == "color") {
    currentColor = colorPicker.value;
    return currentColor;
  } else if (currentMode == "random") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    return `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else {
    return `#fff`;
  }
}
const changeColor = (e) => {
  if (e.type === "mouseover" && !mouseDown) return;
  e.target.style.backgroundColor = getCurrentColor();
  e.target.classList.add("active");
};
const clearGrid = () => {
  container.innerHTML = "";
};

window.addEventListener("load", () => createGrid(currentSize));
clearBtn.addEventListener("click", () => {
  clearGrid();
  createGrid(currentSize);
});
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
radioBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    currentMode = e.target.id;
  });
});
changeBtn.addEventListener("click", () => {
  setCurrentSize(+prompt("Enter Number of Columns and Rows(MAX- 64):"));
  if (
    currentSize &&
    currentSize <= 64 &&
    currentSize >= 1 &&
    typeof currentSize === "number"
  ) {
    createGrid(currentSize);
  } else {
    window.alert(`Incorrect Columns Entered`);
  }
});
