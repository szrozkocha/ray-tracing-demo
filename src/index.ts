import Game from "./Game";
import HtmlException from "./engine/exception/HtmlException";
import BaseException from "./engine/exception/BaseException";
import {Render} from "./engine/Render";
import InputManager from "./engine/InputManager";

function getCanvas(canvasId: string): CanvasRenderingContext2D {
    const canvas: HTMLElement | null = document.getElementById(canvasId);

    if (canvas instanceof HTMLCanvasElement) {
        let ctx = canvas.getContext("2d");
        if(ctx === null) {
            throw new BaseException("Cant create context 2d");
        }

        return ctx;
    }

    throw new HtmlException("Canvas don't exists!");
}

const render = new Render(getCanvas("canvas"))
render.clear();
const inputManager = new InputManager();
let game: Game = new Game(render, inputManager);


window.onkeydown = function(event: KeyboardEvent) {
    inputManager.keyDown(event.keyCode);
}

window.onkeyup = function(event: KeyboardEvent) {
    inputManager.keyUp(event.keyCode);
}


function run(timestamp: number): void {
    game.update(timestamp);

    requestAnimationFrame(run);
}

requestAnimationFrame(run);