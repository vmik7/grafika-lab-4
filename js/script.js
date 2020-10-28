"use strict";

// Ширина и высота экрана
const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
);
const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
);

// Инициализация канваса
let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");

// Растягиваем на весь экран
canvas.width = vw;
canvas.height = vh;



// ФУНКЦИИ ГРАФИЧЕСКОЙ БИБЛИОТЕКИ

// Отрисовка пикселя
let plot = (x, y, color) => {
    if (x >= 0 && y >= 0 && x <= canvas.width && y <= canvas.height) {
        let fillBackup = ctx.fillStyle;

        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);

        ctx.fillStyle = fillBackup;
    }
};

// Заливка области
let fillArea = (x, y, color) => {
    let startColor = ctx.getImageData(x, y, 1, 1).data;
    let q = [{ x: x, y: y }];
    for (let i = 0; i != q.length; i++) {
        let x = q[i].x, y = q[i].y;
        let data = ctx.getImageData(x, y, 1, 1).data;
        if (x >= 0 && y >= 0 && x < canvas.width && y < canvas.height && data[0] == startColor[0] && data[1] == startColor[1] && data[2] == startColor[2] && data[3] == startColor[3]) {
            plot(x, y, color);
            let s = q.length;
            q[s] = { x: x + 1, y: y };
            q[s + 1] = { x: x - 1, y: y };
            q[s + 2] = { x: x, y: y + 1 };
            q[s + 3] = { x: x, y: y - 1 };
        }
    }
};

// Отрисовка линии по алгоритму Брезенхема
let drawLine = (x1, y1, x2, y2, stroke) => {

    let dx = x2 - x1;
    let dy = y2 - y1;

    if (Math.abs(dx) > Math.abs(dy) && x2 < x1 || Math.abs(dx) <= Math.abs(dy) && y2 < y1) {
        x1 = [x2, x2 = x1][0];
        y1 = [y2, y2 = y1][0];
    }

    dx = x2 - x1;
    dy = y2 - y1;

    let stp = 1;
    plot(x1, y1, stroke);

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dy < 0) {
            stp = -1;
            dy *= -1;
        }
        let d = (dy * 2) - dx;
        let d1 = dy * 2;
        let d2 = (dy - dx) * 2;
        let y = y1;

        for (let x = x1 + 1; x <= x2; x++) {
            if (d > 0) {
                y += stp;
                d += d2;
            }
            else {
                d += d1;
            }
            plot(x, y, stroke);
        }
    }
    else {
        if (dx < 0) {
            stp = -1;
            dx *= -1;
        }
        let d = (dx * 2) - dy;
        let d1 = dx * 2;
        let d2 = (dx - dy) * 2;
        let x = x1;

        for (let y = y1 + 1; y <= y2; y++) {
            if (d > 0) {
                x += stp;
                d += d2;
            }
            else {
                d += d1;
            }
            plot(x, y, stroke);
        }
    }
};

// Отрисовка окружности по алгоритму Брезенхема
let drawCircle = (x0, y0, r, stroke, fill) => {
    let x = 0, y = r, gap = 0, delta = (2 - 2 * r);

    while (y >= 0) {
        plot(x0 + x, y0 + y, stroke);
        plot(x0 + x, y0 - y, stroke);
        plot(x0 - x, y0 - y, stroke);
        plot(x0 - x, y0 + y, stroke);

        gap = 2 * (delta + y) - 1;
        if (delta < 0 && gap <= 0) {
            x++;
            delta += 2 * x + 1;
            continue;
        }
        if (delta > 0 && gap > 0) {
            y--;
            delta -= 2 * y + 1;
            continue;
        }
        x++;
        delta += 2 * (x - y);
        y--;
    }

    if (fill) {
        fillArea(x0, y0, fill);
    }
};

// Отрисовка прямоугольника
let drawRect = (x0, y0, dx, dy, stroke, fill) => {
    drawLine(x0, y0, x0, y0 + dy, stroke);
    drawLine(x0, y0 + dy, x0 + dx, y0 + dy, stroke);
    drawLine(x0 + dx, y0 + dy, x0 + dx, y0, stroke);
    drawLine(x0 + dx, y0, x0, y0, stroke);

    if (fill && dx >= 2 && dy >= 2) {
        fillArea(x0 + dx / Math.abs(dx), y0 + dy / Math.abs(dy), fill);
    }
};

// Отрисовка треугольника
let drawTriangle = (x0, y0, x1, y1, x2, y2, stroke, fill) => {  
    drawLine(x0, y0, x1, y1, stroke);
    drawLine(x1, y1, x2, y2, stroke);
    drawLine(x2, y2, x0, y0, stroke);

    if (fill && !(x0 == x1 && x1 == x2) && !(y0 == y1 && y1 == y0)) {

        let cx = Math.floor((x0 + x1 + x2) / 3);
        let cy = Math.floor((y0 + y1 + y2) / 3);

        fillArea(cx, cy, fill);
    }
};

// Отрисовка B-Сплайна
let drawSpline = (arr, stroke) => {
    let coords = [];
    for (let i = 0; i < arr.length; i++)
        coords[i + 1] = arr[i];
    let k = arr.length;

    let num = 0;
    for (let i = 0; i < 2 * k; i += 2) {
        if (i > 0) {
            let dx = coords[i / 2 + 1].x - coords[i / 2].x;
            let dy = coords[i / 2 + 1].y - coords[i / 2].y;
            num += Math.sqrt(dx * dx + dy * dy);
        }
    }
    coords[0] = coords[1];
    coords[coords.length] = coords[coords.length - 1];

    for (let i = 1; i <= coords.length - 3; i++)
    {
        let a = [], b = [];
        let arrs = { a: a, b: b };

        arrs.a[3] = (-coords[i - 1].x + 3 * coords[i].x - 3 * coords[i + 1].x + coords[i + 2].x) / 6;
        arrs.a[2] = (coords[i - 1].x - 2 * coords[i].x + coords[i + 1].x) / 2;
        arrs.a[1] = (-coords[i - 1].x + coords[i + 1].x) / 2;
        arrs.a[0] = (coords[i - 1].x + 4 * coords[i].x + coords[i + 1].x) / 6;
        arrs.b[3] = (-coords[i - 1].y + 3 * coords[i].y - 3 * coords[i + 1].y + coords[i + 2].y) / 6;
        arrs.b[2] = (coords[i - 1].y - 2 * coords[i].y + coords[i + 1].y) / 2;
        arrs.b[1] = (-coords[i - 1].y + coords[i + 1].y) / 2;
        arrs.b[0] = (coords[i - 1].y + 4 * coords[i].y + coords[i + 1].y) / 6;

        let points = {};
        for (let j = 0; j < num; j++) {
            let t = j / num;
            points.x = Math.floor(arrs.a[0] + t * (arrs.a[1] + t * (arrs.a[2] + t * arrs.a[3])));
            points.y = Math.floor(arrs.b[0] + t * (arrs.b[1] + t * (arrs.b[2] + t * arrs.b[3])));
            plot(points.x, points.y, stroke);
        }
    }
};



// ФУНКЦИИ ДЛЯ ТРИАНГУЛЯЦИИ

// Площадь треугольника
let triangleSquare = (a, b, c) => {
    return 1 / 2 * Math.abs((b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y));
};

// Принадлежность точки треугольнику
let triangleInner = (a, b, c, d) => {
    return triangleSquare(a, b, c) == triangleSquare(a, b, d) + triangleSquare(b, c, d) + triangleSquare(c, a, d);
};

// Левая тройка векторов
let isLeft = (a, b, c) => {
    const ab = { x: b.x - a.x, y: b.y - a.y };
    const ac = { x: c.x - a.x, y: c.y - a.y };
    return ab.x * ac.y - ac.x * ab.y > 0;
};

// Проверка наличия других точек унцтри треугольника
let innerPoints = (p) => {
    const a = p[0], b = p[1], c = p[2];

    for (let i = 3; i < p.length; i++) {
        if (triangleInner(a, b, c, p[i])) return true;
    }

    return false;
};

// Триангуляция многоугольника
let triangulatePolygon = (arr) => {

    let n = arr.length;
    let point = arr[n - 1];

    let polygon = arr.slice();
    polygon.pop();

    let colors = ['Gold', 'Yellow', 'Orange', 'DarkOrange', 'Tomato'];

    while (polygon.length >= 3) {
        if (isLeft(polygon[0], polygon[1], polygon[2]) && !innerPoints(polygon)) {            
            drawTriangle(polygon[0].x, polygon[0].y, polygon[1].x, polygon[1].y, polygon[2].x, polygon[2].y, 'black', (triangleInner(polygon[0], polygon[1], polygon[2], point) ? null : colors[Math.round(Math.random() * (colors.length - 1))]));
            polygon.splice(1, 1);
        }
        else {
            if (n < 0) {
                alert('Многоугольник имеет самопересечения, так не честно!');   
                return;  
            }
            const tmp = polygon[0];
            polygon.shift();
            polygon.push(tmp);
            n--;
        }
    }
};



// ПОСТРОЕНИЕ МНОГОУГОЛЬНИКА

// Массив с точками
let points = [];

// Добавляем точку при клике

window.addEventListener('click', (event) => {
    points.push({ x: event.clientX, y: event.clientY });
    render();
});

let render = () => {

    // Очищаем канвас
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Отрисовка точек

    points.forEach((p) => {
        drawCircle(p.x, p.y, 3, 'black');
    });

    // Отрисовка ребер

    // for (let i = 0; i < points.length; i++) {
    //     let j = (i + 1) % points.length;
    //     drawLine(points[i].x, points[i].y, points[j].x, points[j].y, 'black');
    // }

    // Запуск триангуляции 

    triangulatePolygon(points);
};



// let triangle1 = [ {x: 307, y: 348}, {x: 178, y: 249}, {x: 308, y: 179} ];
// let innerPoint = {x: 266, y: 273};

// console.log(triangleInner(triangle1[0], triangle1[1], triangle1[2], innerPoint));
