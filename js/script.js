"use strict"

// Ширина и высота экрана
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

// Масштаб логотипа
let sc = Math.min(vh * 0.8 / 500, vw * 0.8 / 500);


let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');
 
canvas.width = vw;
canvas.height = vh;

let x0 = vw / 2;
let y0 = vh / 2;
let dx = 30;
let dy = 30;

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let gridX = () => {
  let line = (x) => {
		ctx.strokeStyle = '#999';
    ctx.setLineDash([ 1, 3 ]);
    ctx.moveTo(x,0);
    ctx.lineTo(x,canvas.height);
    ctx.stroke();
  }
  for (let i = x0; i < canvas.width; i += dx) {
    line(i);
  }
  for (let i = x0; i >= 0; i -= dx) {
    line(i);
  }
}
gridX();

let gridY = () => {
  let line = (y) => {
		ctx.strokeStyle = '#999';
    ctx.setLineDash([ 1, 3 ]);
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  for (let i = y0; i < canvas.height; i += dy) {
    line(i);
  }
  for (let i = y0; i >= 0; i -= dy) {
    line(i);
  }
}
gridY();

let axisX = () => {
		ctx.strokeStyle = '#000';
    ctx.setLineDash([]);
    ctx.moveTo(0, y0);
    ctx.lineTo(canvas.width, y0);
    ctx.stroke();
}
/* axisX(); */

let axisY = () => {
		ctx.strokeStyle = '#000';
    ctx.setLineDash([]);
    ctx.moveTo(x0,0);
    ctx.lineTo(x0,canvas.height);
    ctx.stroke();
}
/* axisY(); */
