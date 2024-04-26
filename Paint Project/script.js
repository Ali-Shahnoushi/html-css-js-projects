const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const brushSize = document.querySelector("#brush-width");
const ColorPicker = document.querySelector("#color-picker");
const brush = document.querySelector(".brush");
const eraser = document.querySelector(".eraser");
const clearBtn = document.querySelector("button.clear");
const saveBtn = document.querySelector("button.save");

let isDrawing = false;
let currentWidth = 5;
let currentColor = "";

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", endDraw);

saveBtn.addEventListener("click", () => {
  let link = document.createElement("a");
  link.download = `${Date.now()}.jpg`;
  link.href = canvas.toDataURL();
  link.click();
});

clearBtn.addEventListener("click", () => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

eraser.addEventListener("click", () => {
  eraser.classList.add("active");
  brush.classList.remove("active");
  currentColor = "white";
});

brush.addEventListener("click", () => {
  currentColor = ColorPicker.value;
  eraser.classList.remove("active");
  brush.classList.add("active");
});

ColorPicker.addEventListener("change", () => {
  currentColor = ColorPicker.value;
});

brushSize.addEventListener("change", () => {
  currentWidth = brushSize.value;
});

function startDraw() {
  isDrawing = true;
  ctx.beginPath();
  ctx.lineWidth = currentWidth;
}

function drawing(e) {
  if (isDrawing) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = `${currentColor}`;
    ctx.stroke();
  }
  document.querySelector(".txt").innerHTML = currentColor;
}
function endDraw() {
  isDrawing = false;
}
