"use strict"

let canvas = new fabric.Canvas('canvas', {
    width: 500,
    height: 500
});

// Цвет заливки
let logoColor = '#F05133';

// Второй цвет для анимации
let secondColor = '#24292E';

// Функция анимации
let easingInName = 'easeInOutCubic';
let easingOutName = 'easeInOutCubic';

// Фоновый круг
let backgroundCircle = new fabric.Circle({
    selectable: false,
    radius: 220, 
    fill: logoColor, 
    originX: 'center',
    originY: 'center',
    left: 250,
    top: 250
});
canvas.add(backgroundCircle);

// Основной прямоугольник со скругленными углами
let rect = new fabric.Rect({
    selectable: false,
    originX: 'center',
    originY: 'center',
    left: 250,
    top: 250,
    fill: '#fff',
    width: 220,
    height: 220,
    angle: 45,
    rx: 20,
    ry: 20
});
// canvas.add(rect);

// Координаты точек
let circlesPositions = [
    { x: 250, y: 185 },
    { x: 315, y: 250 },
    { x: 250, y: 315 }
];
let smallCircles = [];
circlesPositions.forEach((item, i) => {
    smallCircles[i] = new fabric.Circle({
        selectable: false,
        originX: 'center',
        originY: 'center',
        radius: 25,
        fill: logoColor,
        left: item.x,
        top: item.y
    });
    // canvas.add(smallCircles[i]);
});

// Вертикальная линия
let verticalLine = new fabric.Line(
    [250, 185, 250, 315],
    {
        selectable: false,
        originX: 'center',
        originY: 'center',
        strokeWidth: 20,
        stroke: logoColor
    }
);
// canvas.add(verticalLine);

// Линия под 45
let angleLine = new fabric.Line(
    [204, 139, 315, 250],
    {
        selectable: false,
        originX: 'center',
        originY: 'center',
        strokeWidth: 20,
        stroke: logoColor
    }
);
// canvas.add(angleLine);

// Группируем лого
let gitLogo = new fabric.Group([
    rect, smallCircles[0], smallCircles[1], smallCircles[2], verticalLine, angleLine
], {
    selectable: false,
    originX: 'center',
    originY: 'center',
    centeredRotation: true
});
canvas.add(gitLogo);

// // Анимация появления
// let start = () => {
    
// }

// Анимация основная
let animationIn = () => {
    backgroundCircle.animate('scaleX', 2, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease[easingInName]
    });
    backgroundCircle.animate('scaleY', 2, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease[easingInName]
    });
    [ backgroundCircle, gitLogo.item(1), gitLogo.item(2), gitLogo.item(3) ].forEach((item) => {
        item.animate('fill', secondColor, {
            duration: 1000,
            onChange: canvas.renderAll.bind(canvas),
            easing: fabric.util.ease[easingInName]
        });
    });
    [ gitLogo.item(4), gitLogo.item(5) ].forEach((item) => {
        item.animate('stroke', secondColor, {
            duration: 1000,
            onChange: canvas.renderAll.bind(canvas),
            easing: fabric.util.ease[easingInName]
        });
    });
    gitLogo.animate('angle', 180, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease[easingInName],
    });
    gitLogo.animate('scaleX', 1.3, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease[easingInName],
    });
    gitLogo.animate('scaleY', 1.3, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease[easingInName],
    });
    gitLogo.animate('angle', 360, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease[easingInName],
        onComplete: () => {
            setTimeout(animationOut, 500);
        }
    });
};

let animationOut = () => {
    backgroundCircle.animate('scaleX', 1, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease[easingOutName]
    });
    backgroundCircle.animate('scaleY', 1, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease[easingOutName]
    });
    [ backgroundCircle, gitLogo.item(1), gitLogo.item(2), gitLogo.item(3) ].forEach((item) => {
        item.animate('fill', logoColor, {
            duration: 1000,
            onChange: canvas.renderAll.bind(canvas),
            easing: fabric.util.ease[easingOutName]
        });
    });
    [ gitLogo.item(4), gitLogo.item(5) ].forEach((item) => {
        item.animate('stroke', logoColor, {
            duration: 1000,
            onChange: canvas.renderAll.bind(canvas),
            easing: fabric.util.ease[easingOutName]
        });
    });
    gitLogo.animate('scaleX', 1, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease[easingOutName],
    });
    gitLogo.animate('scaleY', 1, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease[easingOutName],
    });
    gitLogo.animate('angle', 0, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease[easingOutName],
        onComplete: () => {
            setTimeout(animationIn, 1000);
        }
    });
};

animationIn();