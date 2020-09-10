"use strict"

let canvas = new fabric.Canvas('canvas');

// Цвет заливки
let logoColor = '#F05133';

// Фоновый круг
let backgroundCircle = new fabric.Circle({
    radius: 250, 
    fill: logoColor, 
    left: 250,
    top: 250
});
canvas.add(backgroundCircle);

// Основной прямоугольник со скругленными углами
let rect = new fabric.Rect({
    left: 250,
    top: 250,
    fill: '#fff',
    width: 220,
    height: 220,
    angle: 45,
    rx: 20,
    ry: 20
});
canvas.add(rect);

// Координаты точек
let circlesPositions = [
    { x: 250, y: 185 },
    { x: 315, y: 250 },
    { x: 250, y: 315 }
];
circlesPositions.forEach((item) => {
    let smallCircle = new fabric.Circle({
        radius: 25,
        fill: logoColor,
        left: item.x,
        top: item.y
    });
    canvas.add(smallCircle);
});

// Вертикальная линия
let verticalLine = new fabric.Line(
    [250, 185, 250, 315],
    {
        strokeWidth: 20,
        fill: logoColor
    }
);
canvas.add(verticalLine);

// Линия под 45
let angleLine = new fabric.Line(
    [204, 139, 315, 250],
    {
        strokeWidth: 20,
        fill: logoColor
    }
);
canvas.add(angleLine);