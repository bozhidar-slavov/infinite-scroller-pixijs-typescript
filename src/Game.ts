import * as PIXI from "pixi.js"

import Background from "./Background";
import Hero from "./Hero";
import Ground from "./Ground";
import Obstacle from "./Obstacle"

import CollisionManager from "./CollisionManager";
import GameState from "./GameState"

import GameOverPanel from "./GameOverPanel";
import ScorePanel from "./ScorePanel";

export default class Game {

    private static readonly POINTS_PER_OBSTACLE = 10;
    private static readonly INTERVAL_PER_OBSTACLE_WAVE = 3000;
    private static readonly NUMBER_OF_OBSTACLES = 6;

    private _collisionManager: CollisionManager;
    private _spawnObstaclesIntervalId!: NodeJS.Timeout;
    private _bg: Background;
    private _ground: Ground;
    private _hero: Hero;
    private _scorePanel: ScorePanel;
    private _gameOverView: GameOverPanel;

    constructor(private _stage: PIXI.Container) {

        this._collisionManager = new CollisionManager();

        // init game objects
        this._bg = new Background();
        this._ground = new Ground();
        this._hero = new Hero();
        this._gameOverView = new GameOverPanel();
        this._scorePanel = new ScorePanel();

        this._gameOverView.restartButton.on("click", () => {
            PIXI.Ticker.shared.start();
        })

        this._stage.addChild(this._bg);
        this._stage.addChild(this._ground);
        this._stage.addChild(this._scorePanel);
        this._stage.addChild(this._hero);

        // check for collisions
        this._collisionManager.addPlayerCollider(this._hero);
        this._collisionManager.addCollider(this._ground);

        this._collisionManager.on(CollisionManager.CollisionEnter, () => {
            this.stopGameCycle();
            this.stopSpawnObstacles();
            this._gameOverView.score = GameState.instance.score;
            this._stage.addChild(this._gameOverView);

        })

        this.startSpawnObstacles();

        this._gameOverView.restartButton.on("click", this.onRestartClick, this);
    }

    private onRestartClick(): void {
        this._stage.removeChild(this._gameOverView);
        this._hero.resetPosition()

        while (Obstacle.aliveObstacles.length > 0) {
            const obstacle = Obstacle.aliveObstacles[Obstacle.aliveObstacles.length - 1];
            this._collisionManager.removeCollider(obstacle.name);
            obstacle.destroyObstacle();
        }

        GameState.instance.score = 0;
        this._scorePanel.score = GameState.instance.score;

        this.startGameCycle();
        this.startSpawnObstacles();
    }

    private startGameCycle(): void {
        PIXI.Ticker.shared.start();
    }

    private stopGameCycle(): void {
        PIXI.Ticker.shared.stop();
    }

    // TODO: When change browser page set interval must be not invoked
    private startSpawnObstacles(): void {
        this._spawnObstaclesIntervalId = setInterval(() => {
            for (let i = 0; i < Game.NUMBER_OF_OBSTACLES; i++) {
                const obstacle = new Obstacle(i);
                this._collisionManager.addCollider(obstacle);
                this._stage.addChild(obstacle)
                obstacle.on("outOfWorld", (obstacleId: string) => {
                    this._collisionManager.removeCollider(obstacleId);
                    GameState.instance.score += Game.POINTS_PER_OBSTACLE;
                    this._scorePanel.score = GameState.instance.score;
                });
            }
        }, Game.INTERVAL_PER_OBSTACLE_WAVE)
    }

    private stopSpawnObstacles(): void {
        clearInterval(this._spawnObstaclesIntervalId);
    }
}