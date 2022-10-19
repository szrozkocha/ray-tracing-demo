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
      new Wall(new vec2([100, 100]), new vec2([300, 100])),
      new Wall(new vec2([0, 200]), new vec2([200, 200])),
      new Wall(new vec2([0, 500]), new vec2([100, 500])),
      new Wall(new vec2([300, 500]), new vec2([400, 500])),
      new Wall(new vec2([300, 300]), new vec2([400, 300])),
      new Wall(new vec2([400, 200]), new vec2([500, 200])),
      new Wall(new vec2([400, 300]), new vec2([500, 300])),
      new Wall(new vec2([500, 100]), new vec2([700, 100])),
      new Wall(new vec2([600, 200]), new vec2([700, 200])),
      new Wall(new vec2([600, 500]), new vec2([700, 500])),
      new Wall(new vec2([500, 400]), new vec2([600, 400])),
      new Wall(new vec2([700, 300]), new vec2([800, 300])),
      new Wall(new vec2([700, 400]), new vec2([800, 400])),

      new Wall(new vec2([100, 300]), new vec2([100, 400])),
      new Wall(new vec2([200, 200]), new vec2([200, 300])),
      new Wall(new vec2([200, 400]), new vec2([200, 500])),
      new Wall(new vec2([300, 100]), new vec2([300, 400])),
      new Wall(new vec2([400, 0]), new vec2([400, 100])),
      new Wall(new vec2([400, 300]), new vec2([400, 600])),
      new Wall(new vec2([500, 100]), new vec2([500, 300])),
      new Wall(new vec2([500, 400]), new vec2([500, 600])),
      new Wall(new vec2([600, 200]), new vec2([600, 500])),
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
        const step = 2 * Math.PI / (360 * 2);
        for (let a = 0; a < 2 * Math.PI; a += step) {
            const ray = new Ray(this.playerPosition.copy(), new vec2([Math.cos(a), Math.sin(a)]));

            let distance = ray.getNearestIntersection(this.walls);

            if(distance) {
                const lineEnd = new vec2([this.playerPosition.x + Math.cos(a) * distance, this.playerPosition.y + Math.sin(a) * distance]);
                this.render.drawLine(this.playerPosition, lineEnd, "#FFFFFF22");
            }
        }

        this.render.drawCircle(this.playerPosition.x, this.playerPosition.y, 5, "#FFFFFFAA");
    }
}