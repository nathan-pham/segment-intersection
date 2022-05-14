import "@/css/globals.css";
import "@/css/index.css";

import Segment from "@/Segment";

const container = document.getElementById("app") as HTMLDivElement;
const canvas = document.getElementById("app__canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

let animationId = 0;

const getSize = () => ({
    width: container.offsetWidth,
    height: container.offsetHeight,
});

Object.assign(canvas, getSize());

const AB = new Segment("AB", 200, 150, 150, 250);
const CD = new Segment("CD", 50, 100, 250, 200);

const animate = () => {
    const { width, height } = getSize();

    ctx.clearRect(0, 0, width, height);

    AB.render(ctx);
    CD.render(ctx);

    animationId = requestAnimationFrame(animate);
};

animate();

// add event listeners
window.addEventListener("resize", () => {
    Object.assign(canvas, getSize());
});
