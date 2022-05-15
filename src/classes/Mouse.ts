export default class Mouse {
    private x: number = 0;
    private y: number = 0;

    constructor() {
        this.addEventListeners();
    }

    private addEventListeners() {
        document.body.addEventListener("mousemove", (e) => {
            this.x = e.clientX;
            this.y = e.clientY;
        });
    }

    getPos() {
        return { x: this.x, y: this.y };
    }
}
