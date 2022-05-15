import Meth from "@/classes/Meth";
import Mouse from "@/classes/Mouse";

export default class Segment {
    constructor(
        public name: string,
        public x1: number,
        public y1: number,
        public x2: number,
        public y2: number,

        public controls?: boolean
    ) {
        this.name = name.toUpperCase();
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.controls = controls;
    }

    move(mouse: Mouse, angle: number) {
        const pos = mouse.getPos();
        const radius = 50;

        const xOffset = Math.cos(angle) * radius;
        const yOffset = Math.sin(angle) * radius;

        this.x1 = pos.x + xOffset;
        this.y1 = pos.y + yOffset;

        this.x2 = pos.x - xOffset;
        this.y2 = pos.y - yOffset;
    }

    render(ctx: CanvasRenderingContext2D, segment?: Segment) {
        ctx.fillStyle = "#000";

        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();

        Segment.renderPoint(ctx, this.name[0], this.x1, this.y1);
        Segment.renderPoint(ctx, this.name[1], this.x2, this.y2);

        // const midpoint = this.getMidpoint();

        // Segment.renderPoint(ctx, "M", midpoint.x, midpoint.y);

        if (segment && this.controls) {
            const intersection = this.getIntersection(segment);

            if (intersection) {
                Segment.renderPoint(ctx, "I", intersection.x, intersection.y);
            }
        }
    }

    getIntersection(segment: Segment) {
        const top =
            (segment.x2 - segment.x1) * (this.y1 - segment.y1) -
            (segment.y2 - segment.y1) * (this.x1 - segment.x1);

        const uTop =
            (segment.y1 - this.y1) * (this.x1 - this.x2) -
            (segment.x1 - this.x1) * (this.y1 - this.y2);

        const bottom =
            (segment.y2 - segment.y1) * (this.x2 - this.x1) -
            (segment.x2 - segment.x1) * (this.y2 - this.y1);

        const t = bottom === 0 ? -1 : top / bottom;
        const u = bottom === 0 ? -1 : uTop / bottom;

        if (t <= 1 && t >= 0 && u <= 1 && u >= 0) {
            return {
                x: Meth.lerp(this.x1, this.x2, t),
                y: Meth.lerp(this.y1, this.y2, t),
                offset: t,
            };
        }

        return null;
    }

    getMidpoint() {
        return {
            x: Meth.lerp(this.x1, this.x2, 0.5),
            y: Meth.lerp(this.y1, this.y2, 0.5),
        };
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
