const canvas = document.querySelector(".jsCanvas");
const penBtn = document.querySelector(".jsPen");
const eraserBtn = document.querySelector(".jsEraser");
const paintBtn = document.querySelector(".jsPaint");
const range = document.querySelector(".jsRange");
const clearBtn = document.querySelector(".jsClear");
const saveBtn = document.querySelector(".jsSave");
const colors = document.querySelectorAll(".jsColor");

const ctx = canvas.getContext('2d');

const CANVAS_WEIGHT = `60 + vh`;
const CANVAS_HEIGHT = `90 + %`;

// canvas setting
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_WEIGHT, CANVAS_HEIGHT);
ctx.lineWidth = 2.5;
ctx.fillStyle = "#2c2c2c";

// default = false
let painting,
    filling,
    erasing = false;


function startPainting() { 
  painting = true;
  erasing = true;
}

function stopPainting() {
  painting = false;
  erasing = false;
}

/* drawing stroke */
function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;

  if (painting) {
    ctx.lineTo(x, y);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x, y); // 마우스를 따라간 곳이 시작점
  }
}

// choose color = drawing color
function clickColor(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
/* choose color 
 배열에 담아 forEach() 돌려줌 */
colors.forEach((targetColor) => {
  targetColor.addEventListener("click", clickColor);
})

// handle range
function handleRange(e) {
  const rangeSize = e.target.value;
  ctx.lineWidth = rangeSize;
}

function clickPenBtn() {
  ctx.globalCompositeOperation = 'source-over';
  filling = false;
}

function clickPaintBtn() {
  ctx.globalCompositeOperation = 'source-over';
  filling = true;
}

// fill canvas
function handleCanvasClick(e) {
  if (filling) ctx.fillRect(0, 0, CANVAS_HEIGHT, CANVAS_HEIGHT);
}


function clickEraserBtn() {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.strokeStyle = "rgb(255, 255, 255)";
}

function clickClearBtn() {
  ctx.clearRect(0, 0, CANVAS_WEIGHT, CANVAS_WEIGHT);
  ctx.beginPath();
}

function clickSaveBtn() {
  const img = canvas.toDataURL();
  const link = document.createElement("a"); // a: anchar (href link같은거)
  link.href = img;
  link.download = "canvas image";
  link.click();
}


/* 1. 마우스가 돌아다닐 때
  2. 마우스가 클릭 될 때
  3. 마우스가 떨어질 때
  4. 마우스가 캔버스 밖에 있을 때 */
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

if (penBtn) penBtn.addEventListener("click", clickPenBtn);
if (paintBtn) paintBtn.addEventListener("click", clickPaintBtn);
if (eraserBtn) eraserBtn.addEventListener("click", clickEraserBtn);
if (clearBtn) clearBtn.addEventListener("click", clickClearBtn);
if (saveBtn) saveBtn.addEventListener("click", clickSaveBtn);
if (range) range.addEventListener("input", handleRange);