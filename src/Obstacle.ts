import * as PIXI from "pixi.js";

export default class Obstacle extends PIXI.Sprite {

    static readonly aliveObstacles: Obstacle[] = [];

    private static readonly OBSTACLE_WIDTH = 40;
    private static readonly OBSTACLE_HEIGHT = 20;
    private static readonly OBSTACLE_MIN_SPEED = 4;
    private static readonly OBSTACLE_MAX_SPEED = 10;
    private static readonly OBSTACLE_STARTING_X_VALUE = 900;
    private static readonly OBSTACLE_MIN_Y_VALUE = 50;
    private static readonly OBSTACLE_MAX_Y_VALUE = 500;

    private _speed: number;
    private _startingX: number;
    private _startingY: number;

    constructor(index: number) {
        super();
        const obstacle = new PIXI.Sprite(PIXI.Texture.from("obstacle"));

        this.name = `Obstacle-${index}-${new Date()}`;

        obstacle.width = Obstacle.OBSTACLE_WIDTH;
        obstacle.height = Obstacle.OBSTACLE_HEIGHT;

        this._speed = this.generateRandomValues(Obstacle.OBSTACLE_MIN_SPEED, Obstacle.OBSTACLE_MAX_SPEED);

        this._startingX = Obstacle.OBSTACLE_STARTING_X_VALUE;
        this._startingY = this.generateRandomValues(Obstacle.OBSTACLE_MIN_Y_VALUE, Obstacle.OBSTACLE_MAX_Y_VALUE);
        this.x = this._startingX;
        this.y = this._startingY;

        Obstacle.aliveObstacles.push(this);
        this.addChild(obstacle);
        PIXI.Ticker.shared.add(this.animate, this);
    }

    public destroyObstacle(): void {
        PIXI.Ticker.shared.remove(this.animate, this);
        this.parent.removeChild(this);
        Obstacle.aliveObstacles.splice(Obstacle.aliveObstacles.indexOf(this), 1);
    }

    private animate = (): void => {
        this.x -= this._speed;
        if (this.x < -this.width) {
            this.emit("outOfWorld", this.name);
            this.destroyObstacle();
        }
    }

    private generateRandomValues(minValue: number, maxValue: number): number {
        const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        return randomValue;
    }
}