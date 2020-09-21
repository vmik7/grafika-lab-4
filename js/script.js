"use strict"

// Ширина и высота экрана
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

// Масштаб логотипа
let sc = Math.min(vh * 0.8 / 500, vw * 0.8 / 500);

// Цвет заливки
let logoColor = '#F05133';

// Второй цвет для анимации
let secondColor = '#24292E';

// Функция анимации
let easingInName = 'easeInOutCubic';
let easingOutName = 'easeInOutCubic';

// Холст на всю страницу
let canvas = new fabric.Canvas('canvas', {
    width: vw,
    height: vh
});

// Фоновый круг
let backgroundCircle = new fabric.Circle({
    selectable: false,
    radius: 240 * sc, 
    fill: logoColor, 
    originX: 'center',
    originY: 'center',
    top: vh / 2,
    left: vw / 2
});
canvas.add(backgroundCircle);

// Основной прямоугольник со скругленными углами
let rect = new fabric.Rect({
    selectable: false,
    originX: 'center',
    originY: 'center',
    left: 110 * sc, // 250 - 110 = 140;
    top: 110 * sc,
    fill: '#fff',
    width: 220 * sc,
    height: 220 * sc,
    angle: 45,
    rx: 20 * sc,
    ry: 20 * sc
});
// canvas.add(rect);

// Координаты точек
let circlesPositions = [
    { x: 110 * sc, y: 45 * sc }, // { x: 250, y: 185 },
    { x: 175 * sc, y: 110 * sc },
    { x: 110 * sc, y: 175 * sc }
];
let smallCircles = [];
circlesPositions.forEach((item, i) => {
    smallCircles[i] = new fabric.Circle({
        selectable: false,
        originX: 'center',
        originY: 'center',
        radius: 25 * sc,
        fill: logoColor,
        left: item.x,
        top: item.y
    });
    // canvas.add(smallCircles[i]);
});

// Вертикальная линия
let verticalLine = new fabric.Line(
    [110 * sc, 45 * sc, 110 * sc, 175 * sc],
    {
        selectable: false,
        originX: 'center',
        originY: 'center',
        strokeWidth: 20 * sc,
        stroke: logoColor
    }
);
// canvas.add(verticalLine);

// Линия под 45
let angleLine = new fabric.Line(
    [64 * sc, 0 * sc, 175 * sc, 110 * sc],
    {
        selectable: false,
        originX: 'center',
        originY: 'center',
        strokeWidth: 20 * sc,
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
    top: vh / 2,
    left: vw / 2
});
canvas.add(gitLogo);

// // Анимация появления
// let start = () => {
    
// }

// Анимация основная
let animationIn = () => {
    backgroundCircle.animate('scaleX', 10, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease[easingInName]
    });
    backgroundCircle.animate('scaleY', 10, {
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
    gitLogo.animate('scaleX', 1.6, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease[easingInName],
    });
    gitLogo.animate('scaleY', 1.6, {
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