"use strict";

// Ширина и высота экрана
// const vw = Math.min(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), document.body.offsetWidth);
// const vh = Math.min(Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0), document.body.offsetHeight);
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

// Фон
let bgColor = "#fff";

// Цвет сетки
let gridColor = "#ededed";

// Цвет осей
let axesColor = "#232323";

// Цвет графика
let graphColor = "#f54c4c";

// Масштаб сетки
let dx = 30;

// Начало координат
let x0 = vw / 2;
let y0 = vh / 2;

// Инициализация канваса
let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");

// Растягиваем на весь экран
canvas.width = vw;
canvas.height = vh;

// Заливка фоновым цветом
ctx.fillStyle = bgColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Рисует вертикальную линию
let lineVertical = (x, color = '#000', dash = []) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  // ctx.setLineDash(dash);
  ctx.moveTo(x, 0);
  ctx.lineTo(x, canvas.height);
  ctx.stroke();
  // ctx.setLineDash([]);
};

// Рисует горизонтальную линию
let lineHorizintal = (y, color = '#000', dash = []) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  // ctx.setLineDash(dash);
  ctx.moveTo(0, y);
  ctx.lineTo(canvas.width, y);
  ctx.stroke();
  // ctx.setLineDash([]);
};

// Отрисовка сетки
let grid = () => {
  for (let i = x0; i < canvas.width; i += dx)
    lineVertical(i, gridColor, [5, 10]);
  for (let i = x0; i >= 0; i -= dx)
    lineVertical(i, gridColor, [5, 10]);
  for (let i = y0; i < canvas.height; i += dx) 
    lineHorizintal(i, gridColor, [5, 10]);
  for (let i = y0; i >= 0; i -= dx)
    lineHorizintal(i, gridColor, [5, 10]);
    
};
grid();

// Отрисовка осей
let axis = () => {
  lineVertical(x0, axesColor);
  lineHorizintal(y0, axesColor);
};
axis();

