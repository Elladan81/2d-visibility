import {Room, Block, Segment, Point} from './types';
import {drawScene} from './drawScene';
import {loadMap} from './loadMap';
import {calculateVisibility} from './visibility';

const spreadMap =
    (cb) => (array2d) =>
        array2d.map(array1d => cb(...array1d));

const makeSegments = spreadMap(Segment)
const makeBlocks = spreadMap(Block);

// Prepare canvas
const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');
const xOffset = 0.5;
const yOffset = 0.5;
ctx.translate(xOffset, yOffset);
ctx.globalAlpha = 1

// Setup scene
const room = Room(0, 0, 1800, 1200);

const walls = makeSegments([
    [20, 20, 20, 120],
    [20, 20, 100, 20],
    [100, 150, 200, 150],
    [100, 150, 100, 300],
    [100, 300, 200, 300],
    [200, 300, 200, 200],
]);

const blocks = makeBlocks([
    [80, 80, 10, 10],
    [50, 150, 20, 20],
    [400, 400, 40, 40],
    [350, 200, 140, 140],
    [800, 800, 140, 140],
    [1000, 200, 140, 140],
]);

const run = (lightSource) => {
    const endpoints = loadMap(room, blocks, walls, lightSource);
    const visibility = calculateVisibility(lightSource, endpoints);

    requestAnimationFrame(() =>
        drawScene(ctx, room, lightSource, blocks, walls, visibility));
};

canvas.addEventListener('mousemove', ({pageX, pageY}) => {
    let lightSource = Point(pageX, pageY);
    run(lightSource)
});

let lightSource = Point(100, 100);
run(lightSource);
