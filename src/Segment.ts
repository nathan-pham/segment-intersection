export default class Segment {
    constructor(
        public name: string,
        public x1: number,
        public y1: number,
        public x2: number,
        public y2: number
    ) {
        this.name = name.toUpperCase();

        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "#000";

        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();

        Segment.renderPoint(ctx, this.name[0], this.x1, this.y1);
        Segment.renderPoint(ctx, this.name[1], this.x2, this.y2);
    }

    static renderPoint(
        ctx: CanvasRenderingContext2D,
        letter: string,
        x: number,
        y: number
    ) {
        ctx.fillStyle = "#fff";

        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 14px Arial";

        ctx.fillText(letter, x, y);
    }
}
