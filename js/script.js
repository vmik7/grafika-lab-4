"use strict";

// Ширина и высота экрана
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

// Инициализация канваса
let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");

// Растягиваем на весь экран
canvas.width = vw;
canvas.height = vh;

// Инициализация кнопок и инпутов
let gridPlusBtn = document.querySelector('.button_grid-plus');
let gridMinusBtn = document.querySelector('.button_grid-minus');
let graphPlusBtn = document.querySelector('.button_graph-plus');
let graphMinusBtn = document.querySelector('.button_graph-minus');
let graphLeftBtn = document.querySelector('.button_graph-left');
let graphRightBtn = document.querySelector('.button_graph-right');
let graphUpBtn = document.querySelector('.button_graph-up');
let graphDownBtn = document.querySelector('.button_graph-down');
let graphAngleInput = document.querySelector('.angle_input');

// Фон
let bgColor = 'Snow';

// Цвет сетки
let gridColor = 'Gainsboro';

// Цвет осей
let axesColor = 'Purple';

// Цвет подписей
let textColor = 'Black';

// Цвет графика
let graphColor = 'Crimson';

// Масштаб сетки
let dx = 30;

// На сколько масштабировать сетку
let toDx = 10;

// Начало координат
let x0 = vw / 2;
let y0 = vh / 2;

// Смещение графика по осям
let graphOffsetX = 0;
let graphOffsetY = 0;

// На сколько сдвигать график
let toOffset = 0.1;

// Масштаб графика
let graphScale = 0.7;

// На сколько масштабировать график
let toScale = 0.1;

// Угол поворота графика (градусы)
let graphAngle = graphAngleInput.value;

// Ограничения по параметру t
let graphTMin = 0;
let graphTMax = 5 * Math.PI;

// Подробность графика
let graphSteps = 10000;

// Рисует вертикальную линию
let lineVertical = (x, color = '#000', dash = []) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
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
  ctx.lineWidth = 1;
  // ctx.setLineDash(dash);
  ctx.moveTo(0, y);
  ctx.lineTo(canvas.width, y);
  ctx.stroke();
  // ctx.setLineDash([]);
};

// Отрисовка сетки
let grid = () => {

  // Вертикальные линии
  for (let i = x0; i < canvas.width; i += dx) {
    lineVertical(i, gridColor, [2, 2]);
  }
  for (let i = x0; i >= 0; i -= dx) {
    lineVertical(i, gridColor, [2, 2]);
  }

  // Горизонтальные линии
  for (let i = y0; i < canvas.height; i += dx) {
    lineHorizintal(i, gridColor, [2, 2]);
  }    
  for (let i = y0; i >= 0; i -= dx) {
    lineHorizintal(i, gridColor, [2, 2]);
  }

  ctx.font = `${10 / 30 * dx}px Arial, sans-serif`;
  ctx.fillStyle = textColor;

  // Ось OY
  ctx.textAlign = 'right';
  lineVertical(x0, axesColor);
  for (let i = 1; y0 - i * dx > 20; i++) {
    ctx.fillText('' + i, x0 - (10 / 30 * dx), y0 - i * dx + (3 / 30 * dx));
    ctx.beginPath();
    ctx.strokeStyle = textColor;
    ctx.moveTo(x0 - (4 / 30 * dx), y0 - i * dx);
    ctx.lineTo(x0 + (4 / 30 * dx), y0 - i * dx);
    ctx.stroke();
  }
  for (let i = -1; y0 - i * dx < canvas.height - 80; i--) {
    ctx.fillText('' + i, x0 - (10 / 30 * dx), y0 - i * dx + (3 / 30 * dx));
    ctx.beginPath();
    ctx.strokeStyle = textColor;
    ctx.moveTo(x0 - (4 / 30 * dx), y0 - i * dx);
    ctx.lineTo(x0 + (4 / 30 * dx), y0 - i * dx);
    ctx.stroke();
  }

  // Ось OX
  ctx.textAlign = 'center';
  lineHorizintal(y0, axesColor);
  for (let i = 1; x0 + i * dx < canvas.width; i++) {
    ctx.fillText('' + i, x0 + i * dx, y0 + (17 / 30 * dx));
    ctx.beginPath();
    ctx.strokeStyle = textColor;
    ctx.moveTo(x0 + i * dx, y0 - (4 / 30 * dx));
    ctx.lineTo(x0 + i * dx, y0 + (4 / 30 * dx));
    ctx.stroke();
  }
  for (let i = -1; x0 + i * dx > 20; i--) {
    ctx.fillText('' + i, x0 + i * dx, y0 + (17 / 30 * dx));
    ctx.beginPath();
    ctx.strokeStyle = textColor;
    ctx.moveTo(x0 + i * dx, y0 - (4 / 30 * dx));
    ctx.lineTo(x0 + i * dx, y0 + (4 / 30 * dx));
    ctx.stroke();
  }

  ctx.fillText('0', x0 - (5 / 30 * dx), y0 + (10 / 30 * dx));
};

let plot = (x, y) => {
  if (x >= 0 && y >= 0 && x <= canvas.width && y <= canvas.height) {
    ctx.fillStyle = graphColor;
    ctx.fillRect(x, y, 1, 1); 
  }
};

// Отрисовка графика
let graph = () => {
  for (let t = graphTMin; t <= graphTMax; t += (graphTMax - graphTMin) / graphSteps) {
    let x = t * Math.sin(t);
    let y = t * Math.cos(t);
    let angle = -graphAngle * Math.PI / 180;
    let draw_x = x0 + graphOffsetX * dx + graphScale * dx * (x * Math.cos(angle) + y * Math.sin(angle));
    let draw_y = y0 - graphOffsetY * dx - graphScale * dx * (-x * Math.sin(angle) + y * Math.cos(angle));
    plot(draw_x, draw_y);
  }
};

let render = () => {
  // Заливка фоновым цветом
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Сетка
  grid();

  // График
  graph();
};

// Увеличение масштаба сетки
gridPlusBtn.addEventListener('click', () => {
  if (2 * (dx + toDx) < canvas.height && 2 * (dx + toDx) < canvas.width) {
    dx += toDx;
    render();
  }
});

// Уменшьнение масштаба сетки
gridMinusBtn.addEventListener('click', () => {
  if (dx - toDx > 0) {
    dx -= toDx;
    render();
  }
});

// Увеличение масштаба графика
graphPlusBtn.addEventListener('click', () => {
  graphScale += toScale;
  render();
});

// Уменьшение масштаба графика
graphMinusBtn.addEventListener('click', () => {
  if (graphScale - toScale > 0.1) {
    graphScale -= toScale;
    render();
  }
});

// Сдвиг графика влево
graphLeftBtn.addEventListener('click', () => {
  graphOffsetX -= toOffset;
  render();
});

// Сдвиг графика вправо
graphRightBtn.addEventListener('click', () => {
  graphOffsetX += toOffset;
  render();
});

// Сдвиг графика вниз
graphDownBtn.addEventListener('click', () => {
  graphOffsetY -= toOffset;
  render();
});

// Сдвиг графика вверх
graphUpBtn.addEventListener('click', () => {
  graphOffsetY += toOffset;
  render();
});

// Масштабирование графика
graphAngleInput.addEventListener('change', () => {
  graphAngle = graphAngleInput.value;
  render();
});

// Первый рендеринг
render();