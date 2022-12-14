import GameWithLoop from "./engine/GameWithLoop";
import {Render} from "./engine/Render";
import vec2 from "./engine/tsm/vec2";
import InputManager from "./engine/InputManager";
import Ray from "./Ray";
import Wall from "./engine/Wall";

const FPS = 60;
const WIDTH = 800;
const HEIGHT = 600;

export default class Game extends GameWithLoop {
    private playerPosition: vec2 = new vec2([100, 50]);
    private playerSpeed = 1;

    private walls = [
      new Wall(new vec2([0, 0]), new vec2([WIDTH, 0])),
      new Wall(new vec2([WIDTH, 0]), new vec2([WIDTH, HEIGHT])),
      new Wall(new vec2([WIDTH, HEIGHT]), new vec2([0, HEIGHT])),
      new Wall(new vec2([0, HEIGHT]), new vec2([0, 0])),
    ]

    constructor(private render: Render, private inputManager: InputManager) {
        super(FPS);

    }

    // @ts-ignore
    protected tick(frame: number): void {
        this.playerPosition.x += (-this.inputManager.left + +this.inputManager.right) * this.playerSpeed;
        this.playerPosition.y += (-this.inputManager.up + +this.inputManager.down) * this.playerSpeed;
    }

    protected draw(): void {
        this.render.clear();
        const step = 2 * Math.PI / 360;
        for (let a = step; a < 2 * Math.PI; a += step) {
            const ray = new Ray(this.playerPosition.copy(), new vec2([Math.cos(a), Math.sin(a)]));

            let distance = ray.getNearestIntersection(this.walls);

            if(distance) {
                const lineEnd = new vec2([this.playerPosition.x + Math.cos(a) * distance, this.playerPosition.y + Math.sin(a) * distance]);
                this.render.drawLine(this.playerPosition, lineEnd, "#FFFFFFAA");
            }
        }

        this.render.drawCircle(this.playerPosition.x, this.playerPosition.y, 5, "#FFFFFFAA");
    }
}