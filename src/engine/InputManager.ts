export default class InputManager {
    private _left: boolean = false;
    public get left(): boolean {
        return this._left;
    }

    private _up: boolean = false;
    public get up(): boolean {
        return this._up;
    }

    private _right: boolean = false;
    public get right(): boolean {
        return this._right;
    }

    private _down: boolean = false;
    public get down(): boolean {
        return this._down;
    }

    private _attack: boolean = false;
    public get attack(): boolean {
        return this._attack;
    }

    private key(code: number, state: boolean) {
        switch(code) {
            case 65://A
                this._left = state;
                break;
            case 87://W
                this._up = state;
                break;
            case 68://D
                this._right = state;
                break;
            case 83://S
                this._down = state;
                break;
        }
    }

    public keyDown(code: number) {
        this.key(code, true);
    }

    public keyUp(code: number) {
        this.key(code, false);
    }
}