export default abstract class GameWithLoop {
    private lastFrameTimeMs: number;
    private delta: number;
    private readonly tpf: number;
    private frame: number;

    protected constructor(fps: number) {
        this.lastFrameTimeMs = 0;
        this.delta = 0;
        this.tpf = 1000 / fps;
        this.frame = 0;
    }

    public update(timestamp: number): void {
        const timePerFrame = timestamp - this.lastFrameTimeMs;
        const fps = 1 / (timePerFrame / 1000);
        GameWithLoop.updateFps(fps);

        this.delta += timePerFrame;
        this.lastFrameTimeMs = timestamp;

        while(this.delta >= this.tpf) {
            this.tick(this.frame);
            this.delta -= this.tpf;
            ++this.frame;
        }
        this.draw();
    }

    private static updateFps(fps: number) {
        // @ts-ignore
        document.getElementById("fps").innerText = Math.round(fps) + "FPS";
    }

    protected abstract tick(timestamp: number): void;
    protected abstract draw(): void;
}