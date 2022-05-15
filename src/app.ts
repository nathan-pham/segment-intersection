import "@/css/globals.css";
import "@/css/index.css";

import Segment from "@/classes/Segment";
import Mouse from "@/classes/Mouse";

const container = document.getElementById("app") as HTMLDivElement;
const canvas = document.getElementById("app__canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

let animationId = 0;
let angle = 0;

const getSize = () => ({
    width: container.offsetWidth,
    height: container.offsetHeight,
});

Object.assign(canvas, getSize());

const mouse = new Mouse();

const AB = new Segment("AB", 200, 150, 150, 250, true);
const CD = new Segment("CD", 50, 100, 250, 200);

const animate = () => {
    const { width, height } = getSize();

    ctx.clearRect(0, 0, width, height);

    AB.move(mouse, angle);

    CD.render(ctx, AB);
    AB.render(ctx, CD);

    angle += 0.03;

    animationId = requestAnimationFrame(animate);
};

animate();

// add event listeners
window.addEventListener("resize", () => {
    Object.assign(canvas, getSize());
});
